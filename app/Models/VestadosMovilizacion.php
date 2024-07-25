<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VestadosMovilizacion extends Model
{
    protected $table = 'vestados_movilizacion';
    protected $fillable = [
        'estado',
        'total',
        'movilizados',
        'por_movilizar'
    ]; 
}
