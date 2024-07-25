<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Formacion
 * 
 * @property int $id
 * @property string $formacion
 * 
 * @property Collection|Electore[] $electores
 *
 * @package App\Models
 */
class Formacion extends Model
{
	protected $table = 'formacion';
	public $timestamps = false;

	protected $fillable = [
		'formacion'
	];

	public function electores()
	{
		return $this->hasMany(Electore::class);
	}
}
