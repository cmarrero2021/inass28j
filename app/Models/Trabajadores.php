<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Trabajadore
 * 
 * @property int $cedula
 * @property string $nombre
 * @property int $id_estado
 * @property int $id_municipio
 * @property int $id_circuito
 * @property int $id_parroquia
 * @property int $id_gabinete
 * @property int $id_ente
 * @property int $id_dependencia
 * @property string|null $telfono
 * @property bool|null $voto
//  * @property int|null $1x10
 * @property string|null $observaciones
//  * @property time without time zone|null $hora_voto
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property Gabinete $gabinete
 * @property Ente $ente
 * @property Dependencia $dependencia
 *
 * @package App\Models
 */
class Trabajadores extends Model
{
	use SoftDeletes;
	protected $table = 'trabajadores';
	protected $primaryKey = 'cedula';
	public $incrementing = false;
	protected $hidden = ['1x10','hora_voto'];

	protected $casts = [
		'cedula' => 'int',
		'id_estado' => 'int',
		'id_municipio' => 'int',
		'id_circuito' => 'int',
		'id_parroquia' => 'int',
		'id_gabinete' => 'int',
		'id_ente' => 'int',
		'voto' => 'bool',
		'1x10' => 'int',
		'hora_voto' => 'datetime:H_i', 
	];

	protected $fillable = [
		'nombre',
		'id_estado',
		'id_municipio',
		'id_circuito',
		'id_parroquia',
		'id_gabinete',
		'id_ente',
		'id_dependencia',
		'telfono',
		'voto',
		'1x10',
		'observaciones',
		'hora_voto'
	];

	public function gabinete()
	{
		return $this->belongsTo(Gabinete::class, 'id_gabinete');
	}

	public function ente()
	{
		return $this->belongsTo(Ente::class, 'id_ente');
	}

	public function dependencia()
	{
		return $this->belongsTo(Dependencia::class, 'id_dependencia');
	}
}
