<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\CneEstado;
use App\Models\CneMunicipio;


class AuxiliarController extends Controller
      
{
    // public function estados_entes() {
    // public function estados_nucleos() {
    //     $estados = CneEstado::select('id', 'estado')->get();
    //     $gabinetes = Nucleo::select('id', 'nucleo')->get();
    //     return json_encode([$estados,$gabinetes]);
    // }    
    public function estado_municipios(Request $request) {
        $id = $request->id;
        // $municipios = CneMunicipio::select('municipio_id', 'estado_id','municipio')
        $municipios = CneMunicipio::where('estado_id','=',$id)
        ->orderBy('municipio')
        ->get();
        info($municipios);
        return json_encode($municipios);
    }    
    public function municipio_parroquias(Request $request) {
        info($request->all());
        $id_estado = $request->id_estado;
        $id_municipio = $request->id_municipio;
        $parroquias = DB::table('cne_parroquias')->select('parroquia_id','estado_id','municipio_id','parroquia')
        ->where('estado_id','=',$id_estado)
        ->where('municipio_id','=',$id_municipio)
        ->orderBy('parroquia')
        ->get();
        return json_encode($parroquias);
    }    
  
    public function estados() {
        // $estado = CneEstado::select('id','estado')->get();
        $estado = CneEstado::select('estado_id','estado')->get();
        return json_encode($estado);
    }
    // public function nucleos() {
    //     $nucleo = Nucleo::select('id','nucleo')->orderBy('nucleo')->get();
    //     return json_encode($nucleo);
    // }
    // public function tipos() {
    //     $nucleo = TipoElector::select('id','tipo_elector')->orderBy('tipo_elector')->get();
    //     return json_encode($nucleo);
    // }
    // public function formacion() {
    //     $nucleo = Formacion::select('id','formacion')->get();
    //     return json_encode($nucleo);
    // }
    public function auxiliares() {
        $data['estados'] = $this->estados();
        // $data['nucleos'] = $this->nucleos();
        // $data['tipos'] = $this->tipos();
        // $data['formacion'] = $this->formacion();
        return json_encode($data);

    }
}
