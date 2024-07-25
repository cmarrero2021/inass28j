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
 * Class Estado
 * 
 * @property int $id_estado
 * @property int $cod_estado
 * @property string $estado
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property Collection|Municipio[] $municipios
 *
 * @package App\Models
 */
class Estado extends Model
{
	use SoftDeletes;
	protected $table = 'estados';
	protected $primaryKey = 'id_estado';

	protected $casts = [
		'cod_estado' => 'int'
	];

	protected $fillable = [
		'cod_estado',
		'estado'
	];

	public function municipios()
	{
		return $this->hasMany(Municipio::class, 'cod_estado', 'cod_estado');
	}
}
