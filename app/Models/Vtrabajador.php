<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vtrabajador extends Model
{
    protected $table = 'vtrabajadores';
    
    protected $fillable = [
        'cedula',
        'nombres',
        'telefono',
        'cne_estado_id',
        'estado',
        'cne_municipio_id',
        'municipio',
        'cne_parroquia_id',
        'parroquia',
        'voto',
        'hora_voto',
        'observaciones'
    ];
}
