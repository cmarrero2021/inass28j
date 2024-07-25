<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VtipoNucleoMovilizacionHoraTra extends Model
{
    protected $table = 'vnucleos_tipo_elector_movilizacion_hora_tra';
    protected $fillable = [
        'nucleo_id',
        'nucleo',
        'tipo_elector_id',
        'tipo_elector',
        'cant',
        'acumulado'
    ];  
}
