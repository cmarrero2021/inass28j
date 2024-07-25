<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class MetasTrabajadore
 * 
 * @property int $id
 * @property int $nucleo_id
 * @property int|null $meta_estudiante
 * @property string|null $observaciones
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 *
 * @package App\Models
 */
class MetasTrabajadore extends Model
{
	use SoftDeletes;
	protected $table = 'metas_trabajadores';

	protected $casts = [
		'nucleo_id' => 'int',
		'meta_estudiante' => 'int'
	];

	protected $fillable = [
		'nucleo_id',
		'meta_estudiante',
		'observaciones'
	];
}
