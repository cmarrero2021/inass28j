<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VacumuladoTipo extends Model
{
    protected $table = 'vacumulados_tipo';
    protected $fillable = [
        'tipo',
        'hora',
        'acumulado',
    ]; 
}
