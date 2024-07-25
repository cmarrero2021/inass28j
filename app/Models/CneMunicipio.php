<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class CneMunicipio
 * 
 * @property int $id
 * @property int $estado_id
 * @property int $municipio_id
 * @property string $municipio
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property CneEstado $cne_estado
 * @property Collection|CneParroquia[] $cne_parroquias
 * @property Collection|Electore[] $electores
 *
 * @package App\Models
 */
class CneMunicipio extends Model
{
	use SoftDeletes;
	protected $table = 'cne_municipios';

	protected $casts = [
		'estado_id' => 'int',
		'municipio_id' => 'int'
	];

	protected $fillable = [
		'estado_id',
		'municipio_id',
		'municipio'
	];

	public function cne_estado()
	{
		return $this->belongsTo(CneEstado::class, 'estado_id');
	}

	public function cne_parroquias()
	{
		return $this->hasMany(CneParroquia::class, 'municipio_id');
	}

	public function electores()
	{
		return $this->hasMany(Electore::class);
	}
}
