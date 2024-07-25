<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Mensajes extends Model
{
	protected $table = 'mensajes';
	protected $fillable = [
		'nacionalidad',
		'cedula',
		'telefono',
		'fecha',
		'hora',
	];
}
