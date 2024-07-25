<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Electore
 * 
 * @property int $id
 * @property int $cedula
 * @property int $cne_estado_id
 * @property int|null $cne_municipio_id
 * @property int|null $cne_parroquia_id
 * @property int $nucleo_id
 * @property int $tipo_elector_id
 * @property int $formacion_id
 * @property string $nombres
 * @property string|null $telefono
 * @property string|null $email
 * @property bool|null $voto
 * @property time without time zone|null $hora_voto
 * @property string|null $observaciones
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property CneEstado $cne_estado
 * @property CneMunicipio|null $cne_municipio
 * @property Nucleo $nucleo
 * @property TipoElector $tipo_elector
 * @property Formacion $formacion
 *
 * @package App\Models
 */
class Electore extends Model
{
	use SoftDeletes;
	protected $table = 'electores';

	protected $casts = [
		'cedula' => 'int',
		'cne_estado_id' => 'int',
		'cne_municipio_id' => 'int',
		'cne_parroquia_id' => 'int',
		'nucleo_id' => 'int',
		'tipo_elector_id' => 'int',
		'formacion_id' => 'int',
		'voto' => 'bool',
		'hora_voto' => 'datetime:H_i', 
		// 'hora_voto' => 'time without time zone'
	];

	protected $fillable = [
		'cedula',
		'cne_estado_id',
		'cne_municipio_id',
		'cne_parroquia_id',
		'nucleo_id',
		'tipo_elector_id',
		'formacion_id',
		'nombres',
		'telefono',
		'email',
		'voto',
		'hora_voto',
		'observaciones'
	];

	public function cne_estado()
	{
		return $this->belongsTo(CneEstado::class);
	}

	public function cne_municipio()
	{
		return $this->belongsTo(CneMunicipio::class);
	}

	public function nucleo()
	{
		return $this->belongsTo(Nucleo::class);
	}

	public function tipo_elector()
	{
		return $this->belongsTo(TipoElector::class);
	}

	public function formacion()
	{
		return $this->belongsTo(Formacion::class);
	}
}
