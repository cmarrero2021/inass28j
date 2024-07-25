<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VestadosMovilizacionHora extends Model
{
    protected $table = 'vestados_movilizacion_hora';
    protected $fillable = [
        'id',
        'estado',
        'hora',
        'cant',
        'acumulado'
    ];  
}
