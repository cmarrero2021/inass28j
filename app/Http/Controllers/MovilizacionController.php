<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VtotalMovilizacionHora;
use App\Models\VtotalMovilizacionHoraTra;
use App\Models\VtotalMovilizacionHoraEst;
use App\Models\VnucleosMovilizacionHora;
use App\Models\VestadosMovilizacion;
use App\Models\VestadosMovilizacionHora;
use App\Models\VestadosMovilizacionHoraTra;
use App\Models\VestadosMovilizacionHoraEst;
use App\Models\VtipoElectorMovilizacionHora;
use App\Models\VtipoElectorMovilizacionHoraTra;
use App\Models\VtipoNucleoMovilizacionHora;
use App\Models\VtipoNucleoMovilizacionHoraTra;
use App\Models\VnucleosMovilizacionHoraEst;
use App\Models\VnucleosMovilizacionHoraTra;
use App\Models\VtipoEstadosMovilizacionHora;
use App\Models\VtipoEstadosMovilizacionHoraTra;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
class MovilizacionController extends Controller
{
    public function index() {
        return view ('movilizacion.movilizacion');
    }
    public function movilizacion_hora(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $query = VtotalMovilizacionHora::query();
        $query->select('hora','cant','acumulado');
        $total = $query->count();
        if ($request->has('limit')) {
            $total_hora = $query->skip($offset)->take($limit)->get();
        } else {
            $total_hora = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $total_hora
        ]);
    }    
    public function movilizacion_nucleo(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $user = Auth::user();
        $query = VnucleosMovilizacionHora::query();
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
                $query->orWhere('nucleo', 'Ilike', '%' . $search . '%')
                ;
            });
        }
        $total = $query->count();
        if ($request->has('limit')) {
            $nucleo_hora = $query->skip($offset)->take($limit)->get();
        } else {
            $nucleo_hora = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $nucleo_hora
        ]);
    }    
    public function movilizacion_estado(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $user = Auth::user();
        // $query = VestadosMovilizacion::query();
        $query = VestadosMovilizacionHora::query();
        //MODIFICAR PARA ASIGNAR ESTADOS A USUARIOS
        // if (!$user->hasRole('Admin')) {
        //     $nucleos = DB::table('users_nucleos')
        //     ->select('nucleo_id')
        //     ->where('user_id','=',$user->id)
        //     ->get();
        //     $anid = [];
        //     foreach ($nucleos as $key => $value) {
        //         array_push($anid, $value->nucleo_id);
        //     }
        //     $query->whereIn('nucleo_id',$anid);
        // }
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($user,$search) {
                $query->orWhere('estado', 'Ilike', '%' . $search . '%')
                ;
            });
        }
        $total = $query->count();
        if ($request->has('limit')) {
            $estado_hora = $query->skip($offset)->take($limit)->get();
        } else {
            $estado_hora = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $estado_hora
        ]);
    }    
    public function movilizacion_tipo(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $user = Auth::user();
        $query = VtipoElectorMovilizacionHora::query();
        //MODIFICAR PARA ASIGNAR ESTADOS A USUARIOS
        // if (!$user->hasRole('Admin')) {
        //     $nucleos = DB::table('users_nucleos')
        //     ->select('nucleo_id')
        //     ->where('user_id','=',$user->id)
        //     ->get();
        //     $anid = [];
        //     foreach ($nucleos as $key => $value) {
        //         array_push($anid, $value->nucleo_id);
        //     }
        //     $query->whereIn('nucleo_id',$anid);
        // }
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($user,$search) {
                $query->orWhere('tipo_elector', 'Ilike', '%' . $search . '%')
                ;
            });
        }
        $total = $query->count();
        if ($request->has('limit')) {
            $tipo_hora = $query->skip($offset)->take($limit)->get();
        } else {
            $tipo_hora = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $tipo_hora
        ]);
    }    
    public function movilizacion_nucleo_tipo(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $user = Auth::user();
        $query = VtipoNucleoMovilizacionHora::query();
        //MODIFICAR PARA ASIGNAR ESTADOS A USUARIOS
        // if (!$user->hasRole('Admin')) {
        //     $nucleos = DB::table('users_nucleos')
        //     ->select('nucleo_id')
        //     ->where('user_id','=',$user->id)
        //     ->get();
        //     $anid = [];
        //     foreach ($nucleos as $key => $value) {
        //         array_push($anid, $value->nucleo_id);
        //     }
        //     $query->whereIn('nucleo_id',$anid);
        // }
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($user,$search) {
                $query->orWhere('nucleo', 'Ilike', '%' . $search . '%');
                $query->orWhere('tipo_elector', 'Ilike', '%' . $search . '%');
            });
        }
        $total = $query->count();
        if ($request->has('limit')) {
            $nucleo_tipo = $query->skip($offset)->take($limit)->get();
        } else {
            $nucleo_tipo = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $nucleo_tipo
        ]);
    }    
    public function movilizacion_hora_tra(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $query = VtotalMovilizacionHoraTra::query();
        $query->select('hora','cant','acumulado');
        $total = $query->count();
        if ($request->has('limit')) {
            $total_hora = $query->skip($offset)->take($limit)->get();
        } else {
            $total_hora = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $total_hora
        ]);
    }   

    public function movilizacion_hora_est(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $query = VtotalMovilizacionHoraEst::query();
        $query->select('hora','cant','acumulado');
        $total = $query->count();
        if ($request->has('limit')) {
            $total_hora = $query->skip($offset)->take($limit)->get();
        } else {
            $total_hora = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $total_hora
        ]);
    }   
    public function movilizacion_nucleo_tra(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $user = Auth::user();
        $query = VnucleosMovilizacionHoraTra::query();
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
                $query->orWhere('nucleo', 'Ilike', '%' . $search . '%')
                ;
            });
        }
        $total = $query->count();
        if ($request->has('limit')) {
            $nucleo_hora = $query->skip($offset)->take($limit)->get();
        } else {
            $nucleo_hora = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $nucleo_hora
        ]);
    }  
    public function movilizacion_nucleo_est(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $user = Auth::user();
        $query = VnucleosMovilizacionHoraEst::query();
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
                $query->orWhere('nucleo', 'Ilike', '%' . $search . '%')
                ;
            });
        }
        $total = $query->count();
        if ($request->has('limit')) {
            $nucleo_hora = $query->skip($offset)->take($limit)->get();
        } else {
            $nucleo_hora = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $nucleo_hora
        ]);
    }  
    public function movilizacion_estado_tra(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $user = Auth::user();
        $query = VestadosMovilizacionHoraTra::query();
        //MODIFICAR PARA ASIGNAR ESTADOS A USUARIOS
        // if (!$user->hasRole('Admin')) {
        //     $nucleos = DB::table('users_nucleos')
        //     ->select('nucleo_id')
        //     ->where('user_id','=',$user->id)
        //     ->get();
        //     $anid = [];
        //     foreach ($nucleos as $key => $value) {
        //         array_push($anid, $value->nucleo_id);
        //     }
        //     $query->whereIn('nucleo_id',$anid);
        // }
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($user,$search) {
                $query->orWhere('estado', 'Ilike', '%' . $search . '%')
                ;
            });
        }
        $total = $query->count();
        if ($request->has('limit')) {
            $estado_hora = $query->skip($offset)->take($limit)->get();
        } else {
            $estado_hora = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $estado_hora
        ]);
    }
    
    public function movilizacion_estado_est(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $user = Auth::user();
        $query = VestadosMovilizacionHoraEst::query();
        //MODIFICAR PARA ASIGNAR ESTADOS A USUARIOS
        // if (!$user->hasRole('Admin')) {
        //     $nucleos = DB::table('users_nucleos')
        //     ->select('nucleo_id')
        //     ->where('user_id','=',$user->id)
        //     ->get();
        //     $anid = [];
        //     foreach ($nucleos as $key => $value) {
        //         array_push($anid, $value->nucleo_id);
        //     }
        //     $query->whereIn('nucleo_id',$anid);
        // }
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($user,$search) {
                $query->orWhere('estado', 'Ilike', '%' . $search . '%')
                ;
            });
        }
        $total = $query->count();
        if ($request->has('limit')) {
            $estado_hora = $query->skip($offset)->take($limit)->get();
        } else {
            $estado_hora = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $estado_hora
        ]);
    }
    public function movilizacion_nucleo_tipo_tra(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $user = Auth::user();
        $query = VtipoNucleoMovilizacionHoraTra::query();
        //MODIFICAR PARA ASIGNAR ESTADOS A USUARIOS
        // if (!$user->hasRole('Admin')) {
        //     $nucleos = DB::table('users_nucleos')
        //     ->select('nucleo_id')
        //     ->where('user_id','=',$user->id)
        //     ->get();
        //     $anid = [];
        //     foreach ($nucleos as $key => $value) {
        //         array_push($anid, $value->nucleo_id);
        //     }
        //     $query->whereIn('nucleo_id',$anid);
        // }
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($user,$search) {
                $query->orWhere('nucleo', 'Ilike', '%' . $search . '%');
                $query->orWhere('tipo_elector', 'Ilike', '%' . $search . '%');
            });
        }
        $total = $query->count();
        if ($request->has('limit')) {
            $nucleo_tipo = $query->skip($offset)->take($limit)->get();
        } else {
            $nucleo_tipo = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $nucleo_tipo
        ]);
    }  
    public function movilizacion_tipo_tra(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $user = Auth::user();
        $query = VtipoElectorMovilizacionHoraTra::query();
        //MODIFICAR PARA ASIGNAR ESTADOS A USUARIOS
        // if (!$user->hasRole('Admin')) {
        //     $nucleos = DB::table('users_nucleos')
        //     ->select('nucleo_id')
        //     ->where('user_id','=',$user->id)
        //     ->get();
        //     $anid = [];
        //     foreach ($nucleos as $key => $value) {
        //         array_push($anid, $value->nucleo_id);
        //     }
        //     $query->whereIn('nucleo_id',$anid);
        // }
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($user,$search) {
                $query->orWhere('tipo_elector', 'Ilike', '%' . $search . '%')
                ;
            });
        }
        $total = $query->count();
        if ($request->has('limit')) {
            $tipo_hora = $query->skip($offset)->take($limit)->get();
        } else {
            $tipo_hora = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $tipo_hora
        ]);
    }
    public function movilizacion_tipo_estado(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $user = Auth::user();
        $query = VtipoEstadosMovilizacionHora::query();
        //MODIFICAR PARA ASIGNAR ESTADOS A USUARIOS
        // if (!$user->hasRole('Admin')) {
        //     $nucleos = DB::table('users_nucleos')
        //     ->select('nucleo_id')
        //     ->where('user_id','=',$user->id)
        //     ->get();
        //     $anid = [];
        //     foreach ($nucleos as $key => $value) {
        //         array_push($anid, $value->nucleo_id);
        //     }
        //     $query->whereIn('nucleo_id',$anid);
        // }
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($user,$search) {
                $query->orWhere('estado', 'Ilike', '%' . $search . '%');
                $query->orWhere('tipo_elector', 'Ilike', '%' . $search . '%');
            });
        }
        $total = $query->count();
        if ($request->has('limit')) {
            $tipo_hora = $query->skip($offset)->take($limit)->get();
        } else {
            $tipo_hora = $query->get();
        }
        info($tipo_hora);
        return response()->json([
            'total' => $total,
            'rows' => $tipo_hora
        ]);
    }        
    public function movilizacion_tipo_estado_tra(Request $request)
    {
        $offset = $request->input('offset', 0);
        $limit = $request->input('limit', 10);
        $user = Auth::user();
        $query = VtipoEstadosMovilizacionHoraTra::query();
        //MODIFICAR PARA ASIGNAR ESTADOS A USUARIOS
        // if (!$user->hasRole('Admin')) {
        //     $nucleos = DB::table('users_nucleos')
        //     ->select('nucleo_id')
        //     ->where('user_id','=',$user->id)
        //     ->get();
        //     $anid = [];
        //     foreach ($nucleos as $key => $value) {
        //         array_push($anid, $value->nucleo_id);
        //     }
        //     $query->whereIn('nucleo_id',$anid);
        // }
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($user,$search) {
                $query->orWhere('estado', 'Ilike', '%' . $search . '%');
                $query->orWhere('tipo_elector', 'Ilike', '%' . $search . '%');
            });
        }
        $total = $query->count();
        if ($request->has('limit')) {
            $tipo_hora = $query->skip($offset)->take($limit)->get();
        } else {
            $tipo_hora = $query->get();
        }
        return response()->json([
            'total' => $total,
            'rows' => $tipo_hora
        ]);
    }        

}
