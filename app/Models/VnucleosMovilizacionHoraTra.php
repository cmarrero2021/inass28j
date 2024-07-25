<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VnucleosMovilizacionHoraTra extends Model
{
    protected $table = 'vnucleos_movilizacion_hora_tra';
    protected $fillable = [
        'nucleo_id',
        'nucleo',
        'hora',
        'cant',
        'acumulado'
    ]; 
}
