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
        'email',
        'cne_estado_id',
        'estado',
        'cne_municipio_id',
        'municipio',
        'cne_parroquia_id',
        'parroquia',
        'nucleo_id',
        'nucleo',
        'formacion_id',
        'formacion',
        'tipo_elector_id',
        'tipo_elector',
        'voto',
        'hora_voto',
        'observaciones'
    ];
}
