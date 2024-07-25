<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class VestadosMovilizacionHoraTra extends Model
{
    protected $table = 'vestados_movilizacion_hora_tra';
    protected $fillable = [
        'id',
        'estado',
        'hora',
        'cant',
        'acumulado'
    ];  
}
