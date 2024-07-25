<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VtotalMovilizacionHoraEst extends Model
{
    protected $table = 'vtotal_movilizacion_hora_est';
    protected $fillable = [
        'hora',
        'cant',
        'acumulado'
    ];    
}
