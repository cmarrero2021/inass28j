<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Centro
 * 
 * @property int $cod_estado
 * @property int $cod_municipio
 * @property int $cod_parroquia
 * @property int $cod_centro
 * @property int|null $cod_viejo
 * @property string|null $nombre_centro
 * @property string|null $direccion_centro
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 *
 * @package App\Models
 */
class Centro extends Model
{
	use SoftDeletes;
	protected $table = 'centros';
	protected $primaryKey = 'cod_centro';
	public $incrementing = false;

	protected $casts = [
		'cod_estado' => 'int',
		'cod_municipio' => 'int',
		'cod_parroquia' => 'int',
		'cod_centro' => 'int',
		'cod_viejo' => 'int'
	];

	protected $fillable = [
		'cod_estado',
		'cod_municipio',
		'cod_parroquia',
		'cod_viejo',
		'nombre_centro',
		'direccion_centro'
	];
}
