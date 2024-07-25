<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VtipoElectorMovilizacionHoraTra extends Model
{
    protected $table = 'vtipo_elector_movilizacion_hora_tra';
    protected $fillable = [
        'tipo_elector_id',
        'tipo_elector',
        'cant',
        'acumulado'
    ];  
}
