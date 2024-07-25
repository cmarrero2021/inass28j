<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VtotalMovilizacionHora extends Model
{
    protected $table = 'vtotal_movilizacion_hora';
    protected $fillable = [
        'hora',
        'cant',
        'acumulado'
    ];    
}
