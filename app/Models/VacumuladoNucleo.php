<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VacumuladoNucleo extends Model
{
    protected $table = 'vacumulados_nucleos';
    protected $fillable = [
        'nucleo',
        'hora',
        'acumulado',
    ];  
}
