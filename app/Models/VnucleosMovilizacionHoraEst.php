<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VnucleosMovilizacionHoraEst extends Model
{
    protected $table = 'vnucleos_movilizacion_hora_est';
    protected $fillable = [
        'nucleo_id',
        'nucleo',
        'hora',
        'cant',
        'acumulado'
    ];      
}
