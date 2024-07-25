<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Adultos extends Model
{
    use SoftDeletes;
    protected $table = 'adultos';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'cedula',
        'primer_nombre',
        'segundo_nombre',
        'primer_apellido',
        'segundo_apellido',
        'fecha_nacimiento',
        'sexo',
        'estado_civil_id',
        'estado_id',
        'municipio_id',
        'parroquia_id',
        'user_id',
        'telefono',
        'voto',
        'hora_voto'
    ];

    // public function circulo()
    // {
    //     return $this->belongsTo(Circulo::class, 'circulo_id');
    // }

    // public function estadoCivil()
    // {
    //     return $this->belongsTo(EstadoCivil::class, 'estado_civil_id');
    // }    
    public function estado()
    {
        return $this->belongsTo(CneEstado::class, 'estado_id');
    }    
    public function municipio()
    {
        return $this->belongsTo(CneMunicipio::class, 'municipio_id');
    }    
    public function parroquia()
    {
        return $this->belongsTo(CneParroquia::class, 'parroquia_id');
    }    

}
