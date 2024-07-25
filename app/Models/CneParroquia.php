<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class CneParroquia
 * 
 * @property int $id
 * @property int $estado_id
 * @property int $municipio_id
 * @property int $parroquia_id
 * @property string $parroquia
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property CneEstado $cne_estado
 * @property CneMunicipio $cne_municipio
 *
 * @package App\Models
 */
class CneParroquia extends Model
{
	use SoftDeletes;
	protected $table = 'cne_parroquias';

	protected $casts = [
		'estado_id' => 'int',
		'municipio_id' => 'int',
		'parroquia_id' => 'int'
	];

	protected $fillable = [
		'estado_id',
		'municipio_id',
		'parroquia_id',
		'parroquia'
	];

	public function cne_estado()
	{
		return $this->belongsTo(CneEstado::class, 'estado_id');
	}

	public function cne_municipio()
	{
		return $this->belongsTo(CneMunicipio::class, 'municipio_id');
	}
}
