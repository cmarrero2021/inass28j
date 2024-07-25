<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class VacumuladoEstado extends Model
{
    protected $table = 'vacumulado_estados';
    protected $fillable = [
        'estado',
        'hora',
        'acumulado',
    ];  
}
