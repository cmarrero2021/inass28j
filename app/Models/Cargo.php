<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Cargo
 * 
 * @property int $id_cargo
 * @property string $cargo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 *
 * @package App\Models
 */
class Cargo extends Model
{
	use SoftDeletes;
	protected $table = 'cargos';
	protected $primaryKey = 'id_cargo';

	protected $fillable = [
		'cargo'
	];
}
