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
 * Class Ente
 * 
 * @property int $id_ente
 * @property int $id_gabinete
 * @property string $ente
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property Gabinete $gabinete
 * @property Collection|Trabajadore[] $trabajadores
 * @property Collection|Dependencia[] $dependencias
 *
 * @package App\Models
 */
class Ente extends Model
{
	use SoftDeletes;
	protected $table = 'entes';
	protected $primaryKey = 'id_ente';

	protected $casts = [
		'id_gabinete' => 'int'
	];

	protected $fillable = [
		'id_gabinete',
		'ente'
	];

	public function gabinete()
	{
		return $this->belongsTo(Gabinete::class, 'id_gabinete');
	}

	public function trabajadores()
	{
		return $this->hasMany(Trabajadore::class, 'id_ente');
	}

	public function dependencias()
	{
		return $this->hasMany(Dependencia::class, 'id_ente');
	}
}
