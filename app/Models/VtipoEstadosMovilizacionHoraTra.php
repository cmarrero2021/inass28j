<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VtipoEstadosMovilizacionHoraTra extends Model
{
    protected $table = 'vtipo_estados_movilizacion_hora_tra';
    protected $fillable = [
        'estado_id',
        'estado',
        'tipo_elector_id',
        'tipo_elector',
        'cant',
        'acumulado'
    ];     
}
