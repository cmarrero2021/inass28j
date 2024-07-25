<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class CircuitosParroquia
 * 
 * @property int $id_circuito_parroquia
 * @property int $id_circuito
 * @property int $id_parroquia
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 *
 * @package App\Models
 */
class CircuitosParroquia extends Model
{
	use SoftDeletes;
	protected $table = 'circuitos_parroquias';
	protected $primaryKey = 'id_circuito_parroquia';

	protected $casts = [
		'id_circuito' => 'int',
		'id_parroquia' => 'int'
	];

	protected $fillable = [
		'id_circuito',
		'id_parroquia'
	];
}
