<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use App\Models\VterritoriosMovilizacion;
// use App\Models\VestadosMovilizacion;
// use App\Models\VacumuladoEstado;
// use App\Models\VtotalMovilizacionHora;
// use App\Models\VacumuladoNucleo;
use App\Models\Vmovilizacion;
use Illuminate\Support\Facades\DB;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        // $estados_movilizacion = VestadosMovilizacion::all();
        // $estados = VacumuladoEstado::all();
        // $movilizacion_hora = VtotalMovilizacionHora::all();
        // $movilizacion = VterritoriosMovilizacion::all();
        // $nucleos = VacumuladoNucleo::all();
        // foreach ($movilizacion as $registro) {
        //     ${$registro->territorio} = [
        //         'territorio' => $registro->territorio,
        //         'total' => $registro->total,
        //         'movilizados' => $registro->movilizados,
        //         'por_movilizar' => $registro->por_movilizar,
        //     ];
        // }
        // return view('home', compact(
        //     'movilizacion',
        //     'movilizacion_hora',
        //     'nucleos',
        //     'estados',
        // ));
        $movilizacion = Vmovilizacion::select('tipo','total','total_movilizados','total_pormovilizar')->get();
        \Log::info($movilizacion);
        return response()
        ->view('home',compact('movilizacion'))
        ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
        ->header('Pragma', 'no-cache')
        ->header('Expires', '0');
        // return response()
        // ->view('home', compact('movilizacion', 'movilizacion_hora', 'nucleos', 'estados'))
        // ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
        // ->header('Pragma', 'no-cache')
        // ->header('Expires', '0');

        
    }
    private function modificarArray($array)
    {
        if (array_key_exists('total', $array)) {
            unset($array['total']);
            $array['TOTAL MOVILIZADOS'] = $array['movilizados'];
            $array['POR MOVILIZAR'] = $array['por_movilizar'];
            unset($array['movilizados']);
            unset($array['por_movilizar']);
            return $array;
        }
    }

    public function elect_gen_mov() {
        $p=0;
        $mov_gen = VterritoriosMovilizacion::all();
        return json_encode($mov_gen);
    }
    public function elect_gen_tra() {
        $p=0;
    //     $mov_tra = Vmovilizacion::where('tipo','<>','total_electores')
    //     ->Where('tipo','<>','total_estudiantes')
    //     ->Where('tipo','<>','total_trabajadores')
    //     ->get();
    //     return json_encode($mov_tra);
    }
}
