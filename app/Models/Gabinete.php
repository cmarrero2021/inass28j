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
 * Class Gabinete
 * 
 * @property int $id_gabinete
 * @property string $gabinete
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property Collection|Ente[] $entes
 * @property Collection|Trabajadore[] $trabajadores
 * @property Collection|Dependencia[] $dependencias
 *
 * @package App\Models
 */
class Gabinete extends Model
{
	use SoftDeletes;
	protected $table = 'gabinetes';
	protected $primaryKey = 'id_gabinete';

	protected $fillable = [
		'gabinete'
	];

	public function entes()
	{
		return $this->hasMany(Ente::class, 'id_gabinete');
	}

	public function trabajadores()
	{
		return $this->hasMany(Trabajadore::class, 'id_gabinete');
	}

	public function dependencias()
	{
		return $this->hasMany(Dependencia::class, 'id_gabinete');
	}
}
