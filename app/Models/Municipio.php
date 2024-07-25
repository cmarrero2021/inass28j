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
 * Class Municipio
 * 
 * @property int $id_municipio
 * @property int $cod_estado
 * @property int $cod_municipio
 * @property string $municipio
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property Estado $estado
 * @property Collection|Parroquia[] $parroquias
 *
 * @package App\Models
 */
class Municipio extends Model
{
	use SoftDeletes;
	protected $table = 'municipios';
	protected $primaryKey = 'id_municipio';

	protected $casts = [
		'cod_estado' => 'int',
		'cod_municipio' => 'int'
	];

	protected $fillable = [
		'cod_estado',
		'cod_municipio',
		'municipio'
	];

	public function estado()
	{
		return $this->belongsTo(Estado::class, 'cod_estado', 'cod_estado');
	}

	public function parroquias()
	{
		return $this->hasMany(Parroquia::class, 'cod_estado', 'cod_estado');
	}
}
