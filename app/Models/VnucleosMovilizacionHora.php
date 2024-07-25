<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VnucleosMovilizacionHora extends Model
{
    protected $table = 'vnucleos_movilizacion_hora';
    protected $fillable = [
        'nucleo_id',
        'nucleo',
        'hora',
        'cant',
        'acumulado'
    ];  
}
