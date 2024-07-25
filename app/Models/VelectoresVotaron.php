<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VelectoresVotaron extends Model
{
    protected $table = 'velectores_votaron';
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
        'tipo_elector_id',
        'tipo_elector',
        'voto',
        'hora_voto',
        'observacione'
    ];     
}
