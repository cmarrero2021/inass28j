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
 * Class Nucleo
 * 
 * @property int $id
 * @property int $estado_id
 * @property string $nucleo
 * @property Carbon|null $created_at
 * @property Carbon|null $udated_at
 * @property string|null $deleted_at
 * 
 * @property CneEstado $cne_estado
 * @property Collection|Electore[] $electores
 *
 * @package App\Models
 */
class Nucleo extends Model
{
	use SoftDeletes;
	protected $table = 'nucleos';
	public $timestamps = false;

	protected $casts = [
		'estado_id' => 'int',
		'udated_at' => 'datetime'
	];

	protected $fillable = [
		'estado_id',
		'nucleo',
		'udated_at'
	];

	public function cne_estado()
	{
		return $this->belongsTo(CneEstado::class, 'estado_id');
	}

	public function electores()
	{
		return $this->hasMany(Electore::class);
	}
}
