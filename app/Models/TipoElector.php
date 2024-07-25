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
 * Class TipoElector
 * 
 * @property int $id
 * @property string $tipo_elector
 * @property Carbon|null $created_at
 * @property Carbon|null $udated_at
 * @property string|null $deleted_at
 * 
 * @property Collection|Electore[] $electores
 *
 * @package App\Models
 */
class TipoElector extends Model
{
	use SoftDeletes;
	protected $table = 'tipo_elector';
	public $timestamps = false;

	protected $casts = [
		'udated_at' => 'datetime'
	];

	protected $fillable = [
		'tipo_elector',
		'udated_at'
	];

	public function electores()
	{
		return $this->hasMany(Electore::class);
	}
}
