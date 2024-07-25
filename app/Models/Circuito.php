<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Circuito
 * 
 * @property int $id_circuito
 * @property int $id_municipio
 * @property string $circuito
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 *
 * @package App\Models
 */
class Circuito extends Model
{
	use SoftDeletes;
	protected $table = 'circuitos';
	protected $primaryKey = 'id_circuito';

	protected $casts = [
		'id_municipio' => 'int'
	];

	protected $fillable = [
		'id_municipio',
		'circuito'
	];
}
