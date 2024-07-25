<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VtipoElectorMovilizacionHora extends Model
{
    protected $table = 'vtipo_elector_movilizacion_hora';
    protected $fillable = [
        'tipo_elector_id',
        'tipo_elector',
        'cant',
        'acumulado'
    ];   
}
