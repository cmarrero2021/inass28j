<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Parroquia
 * 
 * @property int $id_parroquia
 * @property int $cod_estado
 * @property int $cod_municipio
 * @property int $cod_parroquia
 * @property string $parroquia
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property Municipio $municipio
 *
 * @package App\Models
 */
class Parroquia extends Model
{
	use SoftDeletes;
	protected $table = 'parroquias';
	protected $primaryKey = 'id_parroquia';

	protected $casts = [
		'cod_estado' => 'int',
		'cod_municipio' => 'int',
		'cod_parroquia' => 'int'
	];

	protected $fillable = [
		'cod_estado',
		'cod_municipio',
		'cod_parroquia',
		'parroquia'
	];

	public function municipio()
	{
		return $this->belongsTo(Municipio::class, 'cod_estado', 'cod_estado')
					->where('municipios.cod_estado', '=', 'parroquias.cod_estado')
					->where('municipios.cod_municipio', '=', 'parroquias.cod_estado')
					->where('municipios.cod_estado', '=', 'parroquias.cod_municipio')
					->where('municipios.cod_municipio', '=', 'parroquias.cod_municipio');
	}
}
