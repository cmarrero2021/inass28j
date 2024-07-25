<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ServerException;
use GuzzleHttp\Client;
use App\Models\Mensajes;
use App\Models\Electore;
use App\Models\Participantes;
use App\Models\Adultos;
use App\Models\CneEstado;
use App\Models\CneMunicipio;
use App\Models\CneParroquia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
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
    // public function process_sms(Request $request) {
    //     $texto_msj = $request->query('text');
    //     $ced = substr($texto_msj, 5);
    //     $nac = substr($texto_msj, 4,1);
    //     $cedu = preg_replace('/[.,\- ]/', '', $ced);
    //     if ((ctype_digit($cedu) && strlen($cedu) >= 6 && strlen($cedu) <= 8) && ($nac === 'V' || $nac === 'E')) {
    //         $cedula = (int)$cedu;
    //         $fecha_msj = $request->query('date');
    //         $anio = substr($fecha_msj, 0, 4);
    //         $mes = str_pad(trim(substr($fecha_msj, 4, 2)),2,'0',STR_PAD_LEFT);
    //         $dia = str_pad(trim(substr($fecha_msj, 6, 2)),2,'0',STR_PAD_LEFT);
    //         $fecha = sprintf('%s-%s-%s', $anio, $mes, $dia);
    //         $hora_msj = $request->query('time');
    //         $hora_m = str_pad(trim(substr($hora_msj, 0, 2)),2,'0',STR_PAD_LEFT);
    //         $minuto = str_pad(trim(substr($hora_msj, -4, 2)),2,'0',STR_PAD_LEFT);
    //         $segundo = str_pad(trim(substr($hora_msj, -2, 2)),2,'0',STR_PAD_LEFT);
    //         $hora = sprintf('%02d:%02d:%02d', $hora_m, $minuto, $segundo);
    //         $telefono = $request->query('sender');   
    //         $datos = [
    //            'nacionalidad' => $nac,
    //            'cedula' => $cedula,
    //            'fecha' => $fecha,
    //            'hora' => $hora,
    //            'telefono' => $telefono
    //         ];
    //         $elector = Electore::where('cedula', $datos['cedula'])->first();
    //         if ($elector) {
    //             $elector->voto = true;
    //             $elector->hora_voto = $datos['hora'];
    //             $elector->save();
    //         } else {
    //             $respuesta = "La cédula $nac$cedula no está registrada en nuestra base de datos, revise e intente de nuevo";
    //             return response($respuesta, 200)->header('Content-Type', 'text/plain');
    //         }
    //         $mensaje = Mensajes::where('cedula', $datos['cedula'])->first();
    //         if ($mensaje) {
    //             $respuesta = "La cédula $nac$cedula ya ha sido registrada previamente";
    //             return response($respuesta, 200)->header('Content-Type', 'text/plain');
    //         } else {
    //             Mensajes::create($datos);
    //             $respuesta = "La Cédula $nac$cedula ha sido registrada correctamente";
    //             return response($respuesta, 200)->header('Content-Type', 'text/plain');
    //         }            
    //     } else {
    //         $respuesta = "El formato del mensaje debe ser 28J N99999999 en número, sin espacios, puntos ni guiones y se debe dejar un sólo espacio entre 28J y el número de cédula para que pueda ser procesado; adicionalmente, la longitud de la cédula sólo puede tener entre 6 y 8 números. Corrija la CI ".$nac.$ced;
    //         return response($respuesta, 200)->header('Content-Type', 'text/plain');
    //     }
    // }

    public function process_sms(Request $request) {
        $texto_msj = $request->query('text');
        $ced = substr($texto_msj, 5);
        $nac = substr($texto_msj, 4, 1);
        $cedu = preg_replace('/[.,\- ]/', '', $ced);
        if ((ctype_digit($cedu) && strlen($cedu) >= 6 && strlen($cedu) <= 8) && ($nac === 'V' || $nac === 'E')) {
            $cedula = (int)$cedu;
            $fecha_msj = $request->query('date');
            $anio = substr($fecha_msj, 0, 4);
            $mes = str_pad(trim(substr($fecha_msj, 4, 2)), 2, '0', STR_PAD_LEFT);
            $dia = str_pad(trim(substr($fecha_msj, 6, 2)), 2, '0', STR_PAD_LEFT);
            $fecha = sprintf('%s-%s-%s', $anio, $mes, $dia);
            $hora_msj = $request->query('time');
            $hora_m = str_pad(trim(substr($hora_msj, 0, 2)), 2, '0', STR_PAD_LEFT);
            $minuto = str_pad(trim(substr($hora_msj, -4, 2)), 2, '0', STR_PAD_LEFT);
            $segundo = str_pad(trim(substr($hora_msj, -2, 2)), 2, '0', STR_PAD_LEFT);
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
                $participante = Participantes::where('cedula', $datos['cedula'])->first();
                if ($participante) {
                    $participante->voto = true;
                    $participante->hora_voto = $datos['hora'];
                    $participante->save();
                } else {
                    info(json_encode($datos));
                    $adulto = Adultos::where('cedula', $datos['cedula'])->first();
                    if ($adulto) {
                        $adulto->voto = true;
                        $adulto->hora_voto = $datos['hora'];
                        $adulto->save();
                    } else {
                        Adultos::create([
                            'cedula' => $datos['cedula'],
                            'telefono' => $datos['telefono'],
                            'voto' => true,
                            'hora_voto' => $datos['hora'],
                        ]);
                    }
                }
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
    public function showBulkForm()
    {
        return view('bulk');
    }public function bulk(Request $request)
    {
        $cedulas = $request->input('cedulas');
        $cedulasArray = explode(' ', $cedulas);
        $totalCedulas = count($cedulasArray);
        $actualizadosElectores = 0;
        $actualizadosParticipantes = 0;
        $insertadosAdultos = 0;
        $rechazados = 0;
        $yaExistenAdultos = 0;
        foreach ($cedulasArray as $cedula) {
            $cedula = strtoupper($cedula);
            $cedula = preg_replace('/[^A-Z0-9]/', '', $cedula);
            if (!preg_match('/^[0-9]{6,8}$/', $cedula)) {
                $rechazados++;
                continue;
            }
            $elector = Electore::where('cedula', $cedula)->first();
            if ($elector) {
                $elector->voto = true;
                $elector->hora_voto = Carbon::now();
                $elector->save();
                $actualizadosElectores++;
                continue;
            }
            $participante = Participantes::where('cedula', $cedula)->first();
            if ($participante) {
                $participante->voto = true;
                $participante->hora_voto = Carbon::now();
                $participante->save();
                $actualizadosParticipantes++;
                continue;
            }
            $adulto = Adultos::where('cedula', $cedula)->first();
            $data_cne0=$this->check_cedula($cedula);
            $response_parts = explode("\r\n\r\n", $data_cne0);
            $cne_data = json_decode($response_parts[1], true);
            if (preg_match('/REGISTRO ELECTORAL|FALLECIDO|NO INSCRITO EN RE/', $cne_data['estado'])) {
                $rechazados++;
                continue;
            } else {
                if ($adulto) {
                    $yaExistenAdultos++;
                } else {
                    $estado_id = CneEstado::where('estado','=',$cne_data['estado'])
                    ->value('estado_id');
                    $municipio_id = CneMunicipio::where('municipio','=',$cne_data['municipio'])
                    ->where('estado_id','=',$estado_id)
                    ->value('municipio_id');
                    $parroquia_id = CneParroquia::where('parroquia','=',$cne_data['parroquia'])
                    ->where('estado_id','=',$estado_id)
                    ->where('municipio_id','=',$municipio_id)
                    ->value('parroquia_id');
                    Adultos::create([
                        'cedula' => $cedula,
                        'primer_nombre' => $cne_data['strnombre_primer'],
                        'segundo_nombre' => $cne_data['strnombre_segundo'],
                        'primer_apellido' => $cne_data['strapellido_primer'],
                        'segundo_apellido' => $cne_data['strapellido_segundo'],
                        'fecha_nacimiento' => $cne_data['dtmnacimiento'],
                        'sexo' => $cne_data['strgenero'],
                        'estado_civil_id' => $cne_data['clvestado_civil'],
                        'estado_id' => $estado_id,
                        'municipio_id' => $municipio_id,
                        'parroquia_id' => $parroquia_id,
                        'hora_voto' => Carbon::now(),
                        'voto' => true,
                    ]);
                    $insertadosAdultos++;
                }
            }
        }
        return back()->with('status', "Proceso finalizado: Total cédulas: $totalCedulas, Actualizados en electores: $actualizadosElectores, Actualizados en participantes: $actualizadosParticipantes, Insertados en adultos: $insertadosAdultos, Ya existían en adultos: $yaExistenAdultos, Rechazados: $rechazados.");
    }
    public function check_cedula($cedula) {
        $client = new Client(['allow_redirects' => true]);
        $client1 = new Client(['allow_redirects' => true]);
        try {
            $response1 = $client1->get('http://poi-r.vps.co.ve/cne', [
                'query' => ['cedula' => $cedula],
            ]);
            $body1 = $response1->getBody();
            $abody1 = json_decode($body1,true);
            $response = $client->get('http://poi-r.vps.co.ve/cedula', [
                'query' => ['cedula' => $cedula],
            ]);
            $body = $response->getBody();
            if(strlen($body) > 5) {
                $data = json_decode($body, true);
            } else {
                return response()->json(['error' => 'No se consiguienron datos de la cédula ' . $cedula], 200);
            }
            $data['sexo'] = $data['strgenero']=='F' ? 'FEMENINO' : 'MASCULINO';
            if ($abody1) {
                $data['estado'] = $abody1['estado'];
                $data['municipio'] = $abody1['municipio'];
                $data['parroquia'] = $abody1['parroquia'];
            }
            if($body) {
                return response()->json($data);
            } else {
                return false;
            }
        } catch (RequestException $e) {
            if ($e->hasResponse()) {
                $responseBody = $e->getResponse()->getBody()->getContents();
                return response()->json(['error' => 'Error de la API externa: ' . $responseBody], 500);
            } else {
                return response()->json(['error' => 'Error al comunicarse con la API externa.'], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }    
}
