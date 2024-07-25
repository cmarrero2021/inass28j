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
 * Class Dependencia
 * 
 * @property int $id_dependencia
 * @property int $id_gabinete
 * @property int $id_ente
 * @property string|null $nombre_dependencia
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property Gabinete $gabinete
 * @property Ente $ente
 * @property Collection|Trabajadore[] $trabajadores
 *
 * @package App\Models
 */
class Dependencia extends Model
{
	use SoftDeletes;
	protected $table = 'dependencias';
	protected $primaryKey = 'id_dependencia';

	protected $casts = [
		'id_gabinete' => 'int',
		'id_ente' => 'int'
	];

	protected $fillable = [
		'id_gabinete',
		'id_ente',
		'nombre_dependencia'
	];

	public function gabinete()
	{
		return $this->belongsTo(Gabinete::class, 'id_gabinete');
	}

	public function ente()
	{
		return $this->belongsTo(Ente::class, 'id_ente');
	}

	public function trabajadores()
	{
		return $this->hasMany(Trabajadore::class, 'id_dependencia');
	}
}
