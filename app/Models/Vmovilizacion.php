<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vmovilizacion extends Model
{
    protected $table = 'vmovilizacion';
    protected $fillable = [
        'tipo',
        'total',
        'total_movilizado',
        'total_pormovilizar'
    ]; 
}
