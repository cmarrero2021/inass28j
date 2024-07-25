<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VtotalMovilizacionHoraTra extends Model
{
    protected $table = 'vtotal_movilizacion_hora_tra';
    protected $fillable = [
        'hora',
        'cant',
        'acumulado'
    ];      
}
