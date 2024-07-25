<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use App\Models\Trabajadores;
use App\Models\Electore;
use App\Models\Vtrabajador;
use App\Models\VelectoresVotaron;

class TrabajadorController extends Controller
{
    public function __construct() {
        $this->middleware('can:admin.workers.index')->only('index');
        $this->middleware('can:admin.workers.edit')->only('edit');
        $this->middleware('can:admin.workers.create')->only('create');
        $this->middleware('can:admin.workers.show')->only('show');
        $this->middleware('can:admin.workers.destroy')->only('destroy');
    }

    public function index()
    {
        return view('trabajadores');
    }
    public function seguimiento()
    {
        return view('seguimiento');
    }
    public function votaron()
    {
        return view('votaron');
    }
    public function trab_tabla(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $user = Auth::user();
        $query = Vtrabajador::query();
        if (!$user->hasRole('Admin')) {
            $nucleos = DB::table('users_nucleos')
            ->select('nucleo_id')
            ->where('user_id','=',$user->id)
            ->get();
            $anid = [];
            foreach ($nucleos as $key => $value) {
                array_push($anid, $value->nucleo_id);
            }
            $query->whereIn('nucleo_id',$anid);
        }
        
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($user,$search) {
                $query
                    ->orWhere('nombres', 'Ilike', '%' . $search . '%')
                    ->orWhere('cedula', 'Ilike', '%' . $search . '%')
                    ->orWhere('cedula', 'Ilike', '%' . $search . '%')
                    ->orWhere('estado', 'Ilike', '%' . $search . '%')
                    ->orWhere('municipio', 'Ilike', '%' . $search . '%')
                    ->orWhere('parroquia', 'Ilike', '%' . $search . '%')
                    ->orWhere('nucleo', 'Ilike', '%' . $search . '%')
                    ->orWhere('tipo_elector', 'Ilike', '%' . $search . '%')
                    ->orWhere('telefono', 'Ilike', '%' . $search . '%')
                    ->orWhere('email', 'Ilike', '%' . $search . '%')
                    ->orWhere('voto', 'Ilike', '%' . $search . '%')
                    ->orWhere('hora_voto', 'Ilike', '%' . $search . '%')
                    ->orWhere('observaciones', 'Ilike', '%' . $search . '%')
                ;
            });            
        } else {
            if ($request->has('filter')) {
                $filters = json_decode($request->filter, true);foreach ($filters as $column => $value) {
                    $query->where($column, 'like', '%' . $value . '%');
                }
            }
        }
        $total = $query->count();
        if ($request->has('limit')) {
            $trabajadores = $query->skip($offset)->take($limit)->get();
        } else {
            $trabajadores = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $trabajadores
        ]);
    }

    public function vot_tabla(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $user = Auth::user();
        $query = VelectoresVotaron::query();
        if (!$user->hasRole('Admin')) {
            $nucleos = DB::table('users_nucleos')
            ->select('nucleo_id')
            ->where('user_id','=',$user->id)
            ->get();
            $anid = [];
            foreach ($nucleos as $key => $value) {
                array_push($anid, $value->nucleo_id);
            }
            $query->whereIn('nucleo_id',$anid);
        }
        
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($user,$search) {
                $query
                    ->orWhere('nombres', 'Ilike', '%' . $search . '%')
                    ->orWhere('cedula', 'Ilike', '%' . $search . '%')
                    ->orWhere('cedula', 'Ilike', '%' . $search . '%')
                    ->orWhere('estado', 'Ilike', '%' . $search . '%')
                    ->orWhere('municipio', 'Ilike', '%' . $search . '%')
                    ->orWhere('parroquia', 'Ilike', '%' . $search . '%')
                    ->orWhere('nucleo', 'Ilike', '%' . $search . '%')
                    ->orWhere('tipo_elector', 'Ilike', '%' . $search . '%')
                    ->orWhere('telefono', 'Ilike', '%' . $search . '%')
                    ->orWhere('email', 'Ilike', '%' . $search . '%')
                    ->orWhere('hora_voto', 'Ilike', '%' . $search . '%')
                    ->orWhere('observaciones', 'Ilike', '%' . $search . '%')
                ;
            });            
        } else {
            if ($request->has('filter')) {
                $filters = json_decode($request->filter, true);foreach ($filters as $column => $value) {
                    $query->where($column, 'like', '%' . $value . '%');
                }
            }
        }
        $total = $query->count();
        if ($request->has('limit')) {
            $trabajadores = $query->skip($offset)->take($limit)->get();
        } else {
            $trabajadores = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $trabajadores
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cedula' => 'required|numeric|unique:electores,cedula',
            'nombres' => 'required',
            'cne_estado_id' => 'required',
            'cne_municipio_id' => 'required',
            'cne_parroquia_id' => 'required',
            'nucleo_id' => 'required',
            'tipo_elector_id' => 'required',
            'formacion_id' => 'required',
            'telefono' => 'required|numeric',
            'email' => 'sometimes|nullable|email',
        ], [
            'required' => 'El campo :attribute es obligatorio.',
            'numeric' => 'El campo :attribute debe ser numérico.',
            'email' => 'El campo :attribute debe ser un correo válido.',
            'unique' => 'La :attribute ya está registrada.',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Error en la validación', 'errors' => $validator->errors()], 200);
        }
        $voto = $request->voto = 'SI' ? true: false;
        $datos = [
            'cedula' => $request->cedula,
            'nombres' => $request->nombres,
            'voto' => $voto,
            'hora_voto' => $request->hora_voto,
            'cne_estado_id' => $request->cne_estado_id,
            'cne_municipio_id' => $request->cne_municipio_id,
            'cne_parroquia_id' => $request->cne_parroquia_id,
            'nucleo_id' => $request->nucleo_id,
            'tipo_elector_id' => $request->tipo_elector_id,
            'formacion_id' => $request->formacion_id,
            'telefono' => $request->telefono,
            'email' => $request->email,
        ];
        if ($request->has('observaciones')) {
            $datos['observaciones'] = $request->observaciones;
        }
        if ($request->has('hora_voto') && $voto) {
            $datos['hora_voto'] = $request->hora_voto;
        }
        try {
            Electore::where('cedula', $request->cedula)->update($datos);
            Electore::create($datos);
            return response()->json(['message' => 'Trabajador creado exitosamente','status' =>200], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error en la creación del trabajador','status'=>500], 200);
        }   
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function actualizar_trabajador(Request $request) {
        $validator = Validator::make($request->all(), [
            'cedula' => 'required|numeric|unique:electores,cedula',
            'nombres' => 'required',
            'cne_estado_id' => 'required',
            'cne_municipio_id' => 'required',
            'cne_parroquia_id' => 'required',
            'nucleo_id' => 'required',
            'tipo_elector_id' => 'required',
            'formacion_id' => 'required',
            'telefono' => 'required|numeric',
            'email' => 'sometimes|nullable|email',
        ], [
            'required' => 'El campo :attribute es obligatorio.',
            'numeric' => 'El campo :attribute debe ser numérico.',
            'email' => 'El campo :attribute debe ser un correo válido.',
            'unique' => 'La :attribute ya está registrada.',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Error en la validación', 'errors' => $validator->errors()], 200);
        }
        //////////////
        $voto = $request->voto = 'SI' ? true: false;
        $datos = [
            'voto' => $voto,
            'hora_voto' => $request->hora_voto,
            'cne_estado_id' => $request->cne_estado_id,
            'cne_municipio_id' => $request->cne_municipio_id,
            'cne_parroquia_id' => $request->cne_parroquia_id,
            'nucleo_id' => $request->nucleo_id,
            'tipo_elector_id' => $request->tipo_elector_id,
            'formacion_id' => $request->formacion_id,
            'telefono' => $request->telefono,
            'email' => $request->email,
        ];
        if ($request->has('observaciones')) {
            $datos['observaciones'] = $request->observaciones;
        }
        if ($request->has('hora_voto') && $voto) {
            $datos['hora_voto'] = $request->hora_voto;
        }
        try {
            Electore::where('cedula', $request->cedula)->update($datos);
            return response()->json(['message' => 'Trabajador actualizado exitosamente','status' =>200], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error en la actualización del trabajador','status'=>500], 200);
        }        
        //////////////
    }
    public function update(Request $request, string $id)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $trabajador = Electore::where('cedula', '=', $id)->first();
        if ($trabajador) {
            $trabajador->deleted_at = now();
            $trabajador->save();
        }
        return json_encode($trabajador);
    }
    public function check(Request $request) {
        $cedula = $request->cedula;
        $voto = true;
        $horaVoto = $request->hora_voto;
        $trabajador = Electore::where('cedula', '=',$cedula)->first();
        $trabajador->voto = $voto;
        $trabajador->hora_voto = $horaVoto;
        $trabajador->save();
        return json_encode($trabajador);
    }
    public function obtener_trabajador(Request $request) {
        $ci = $request->ci;
        $trabajador = VTrabajador::where('cedula','=',$ci)->get();
        return json_encode($trabajador);
    }
    public function trab_seguimiento(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $user = Auth::user();
        $query = Vtrabajador::query();
        $query->select('cedula','nombres','telefono','nucleo','hora_voto','observaciones');
        $query->whereNull('voto');
        if (!$user->hasRole('Admin')) {
            $nucleos = DB::table('users_nucleos')
            ->select('nucleo_id')
            ->where('user_id','=',$user->id)
            ->get();
            $anid = [];
            foreach ($nucleos as $key => $value) {
                array_push($anid, $value->nucleo_id);
            }
            $query->whereIn('nucleo_id',$anid);
        }
        
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($user,$search) {
                $query
                    ->orWhere('cedula', 'Ilike', '%' . $search . '%')
                    ->orWhere('cedula', 'Ilike', '%' . $search . '%')
                    ->orWhere('nucleo', 'Ilike', '%' . $search . '%')
                    ->orWhere('hora_voto', 'Ilike', '%' . $search . '%')
                    ->orWhere('observaciones', 'Ilike', '%' . $search . '%')
                ;
            });            
        } else {
            if ($request->has('filter')) {
                $filters = json_decode($request->filter, true);foreach ($filters as $column => $value) {
                    $query->where($column, 'like', '%' . $value . '%');
                }
            }
        }
        $total = $query->count();
        if ($request->has('limit')) {
            $trabajadores = $query->skip($offset)->take($limit)->get();
        } else {
            $trabajadores = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $trabajadores
        ]);
    }
    public function trab_filtros(Request $request)
    {
        $field = $request->input('field');
        $options = Vtrabajador::distinct()->pluck($field);
    
        $result = [];
        foreach ($options as $option) {
            $result[$option] = $option;
        }
    
        return response()->json([
            'options' => $result
        ]);
    }
    
}
