<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mensajes;
use App\Models\Electore;
use Illuminate\Support\Facades\DB;

class MensajesController extends Controller
{
    public function index() {
        $mensajes=Mensajes::all();
        return view ('mensajes');
    }
    public function mens_tabla(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $query = Mensajes::query();
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query
                    ->orWhere('nacionalidad', 'Ilike', '%' . $search . '%')
                    ->orWhere('cedula', 'Ilike', '%' . $search . '%')
                    ->orWhere('telefono', 'Ilike', '%' . $search . '%')
                    ->orWhere('fecha', 'Ilike', '%' . $search . '%')
                    ->orWhere('hora', 'Ilike', '%' . $search . '%')
                ;
            });            
        } 
        if ($request->has('filter')) {
            $filters = json_decode($request->filter, true);foreach ($filters as $column => $value) {
                $query->where($column, 'like', '%' . $value . '%');
            }
        }
        $total = $query->count();
        if ($request->has('limit')) {
            $mensajes = $query->skip($offset)->take($limit)->get();
        } else {
            $mensajes = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $mensajes
        ]);
    }
    public function process_sms(Request $request) {
        $texto_msj = $request->query('text');
        $ced = substr($texto_msj, 5);
        $nac = substr($texto_msj, 4,1);
        $cedu = preg_replace('/[.,\- ]/', '', $ced);
        if ((ctype_digit($cedu) && strlen($cedu) >= 6 && strlen($cedu) <= 8) && ($nac === 'V' || $nac === 'E')) {
            $cedula = (int)$cedu;
            $fecha_msj = $request->query('date');
            $anio = substr($fecha_msj, 0, 4);
            $mes = str_pad(trim(substr($fecha_msj, 4, 2)),2,'0',STR_PAD_LEFT);
            $dia = str_pad(trim(substr($fecha_msj, 6, 2)),2,'0',STR_PAD_LEFT);
            $fecha = sprintf('%s-%s-%s', $anio, $mes, $dia);
            $hora_msj = $request->query('time');
            $hora_m = str_pad(trim(substr($hora_msj, 0, 2)),2,'0',STR_PAD_LEFT);
            $minuto = str_pad(trim(substr($hora_msj, -4, 2)),2,'0',STR_PAD_LEFT);
            $segundo = str_pad(trim(substr($hora_msj, -2, 2)),2,'0',STR_PAD_LEFT);
            $hora = sprintf('%02d:%02d:%02d', $hora_m, $minuto, $segundo);
            $telefono = $request->query('sender');   
            $datos = [
               'nacionalidad' => $nac,
               'cedula' => $cedula,
               'fecha' => $fecha,
               'hora' => $hora,
               'telefono' => $telefono
            ];
            $elector = Electore::where('cedula', $datos['cedula'])->first();
            if ($elector) {
                $elector->voto = true;
                $elector->hora_voto = $datos['hora'];
                $elector->save();
            } else {
                $respuesta = "La cédula $nac$cedula no está registrada en nuestra base de datos, revise e intente de nuevo";
                return response($respuesta, 200)->header('Content-Type', 'text/plain');
            }
            $mensaje = Mensajes::where('cedula', $datos['cedula'])->first();
            if ($mensaje) {
                $respuesta = "La cédula $nac$cedula ya ha sido registrada previamente";
                return response($respuesta, 200)->header('Content-Type', 'text/plain');
            } else {
                Mensajes::create($datos);
                $respuesta = "La Cédula $nac$cedula ha sido registrada correctamente";
                return response($respuesta, 200)->header('Content-Type', 'text/plain');
            }            
        } else {
            $respuesta = "El formato del mensaje debe ser 28J N99999999 en número, sin espacios, puntos ni guiones y se debe dejar un sólo espacio entre 28J y el número de cédula para que pueda ser procesado; adicionalmente, la longitud de la cédula sólo puede tener entre 6 y 8 números. Corrija la CI ".$nac.$ced;
            return response($respuesta, 200)->header('Content-Type', 'text/plain');
        }
    }

}
