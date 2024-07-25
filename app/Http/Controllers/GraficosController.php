<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VtotalMovilizacionHora;
use App\Models\VacumuladoNucleo;
use App\Models\VacumuladoEstado;
use App\Models\VacumuladoTipo;
use App\Models\VtotalMovilizacionHoraTra;
use App\Models\VtotalMovilizacionHoraEst;
use App\Models\VnucleosMovilizacionHora;
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

class GraficosController extends Controller
{
    public function index() {
        $max_hora_movilizacion = VtotalMovilizacionHora::max('hora');
        $movilizacion = VtotalMovilizacionHora::all();
        $nucleos = VacumuladoNucleo::all();
        // $nucleos = VacumuladoNucleo::where('nucleo','='.'SUCRE')->get();
        // $nucleos_hora = VtipoNucleoMovilizacionHora::all();
        // $nucleos_hora = VnucleosMovilizacionHora::where('nucleo','='.'SUCRE')->get();
        $capital = ['CARICUAO','CEPAP','EL VALLE','IDECYT','PALO VERDE','POSTGRADO','SANTA FE'];
        $centro = ['CANOABO','LOS TEQUES','MARACAY','OCUMARE DEL TUY','VALENCIA'];
        $andes = ['EL VIGÍA','LA GRITA','EL VALLE','SIMÓN DE MUCUCHÍES','VALERA'];
        $llanos = ['APURE','ARAURE','SAN CARLOS','SAN JUAN DE LOS MORROS','VALLE DE LA PASCUA','ZARAZA'];
        $occidente = ['BARQUISIMETO','CORO'];
        $oriente = ['BARCELONA','MATURÍN','SUCRE'];
        $sur = ['CIUDAD BOLÍVAR'];
        $nucleos_hora = VnucleosMovilizacionHora::all();
        $nucleos_hora_cap = VnucleosMovilizacionHora::whereIn('nucleo',$capital)->get();
        $nucleos_hora_cen = VnucleosMovilizacionHora::whereIn('nucleo',$centro)->get();
        $nucleos_hora_and = VnucleosMovilizacionHora::whereIn('nucleo',$andes)->get();
        $nucleos_hora_lla = VnucleosMovilizacionHora::whereIn('nucleo',$llanos)->get();
        $nucleos_hora_occ = VnucleosMovilizacionHora::whereIn('nucleo',$occidente)->where('hora','<>','04:00:00')->get();
        $nucleos_hora_ori = VnucleosMovilizacionHora::whereIn('nucleo',$oriente)->get();
        $nucleos_hora_sur = VnucleosMovilizacionHora::whereIn('nucleo',$sur)->get();
        $max_hora_nucleos = VacumuladoNucleo::max('hora');
        $estados = VacumuladoEstado::all();
        $max_hora_estados = VacumuladoNucleo::max('hora');
        $tipos = VacumuladoTipo::all();
        $max_hora_tipos = VacumuladoTipo::max('hora');
        return view('graficos.graficos',compact(
            'max_hora_movilizacion',
            'movilizacion',
            'nucleos',
            'nucleos_hora',
            'nucleos_hora_cap',
            'nucleos_hora_cen',
            'nucleos_hora_and',
            'nucleos_hora_lla',
            'nucleos_hora_occ',
            'nucleos_hora_ori',
            'nucleos_hora_sur',
            'max_hora_nucleos',
            'estados',
            'max_hora_estados',
            'tipos',
            'max_hora_tipos'
        ));
    }

    

    
}
