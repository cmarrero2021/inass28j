<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VestadosMovilizacionHoraEst extends Model
{
    protected $table = 'vestados_movilizacion_hora_est';
    protected $fillable = [
        'id',
        'estado',
        'hora',
        'cant',
        'acumulado'
    ];  
}
