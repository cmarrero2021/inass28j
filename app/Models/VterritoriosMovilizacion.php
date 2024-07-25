<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class VterritoriosMovilizacion extends Model
{
    protected $table = 'vterritorios_movilizacion';
    protected $fillable = [
        'territorio',
        'total',
        'movilizados',
        'por_movilizar'
    ]; 
}
