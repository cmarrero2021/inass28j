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
 * Class CneEstado
 * 
 * @property int $id
 * @property string $estado
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property Collection|CneParroquia[] $cne_parroquias
 * @property Collection|CneMunicipio[] $cne_municipios
 * @property Collection|Nucleo[] $nucleos
 * @property Collection|Electore[] $electores
 *
 * @package App\Models
 */
class CneEstado extends Model
{
	use SoftDeletes;
	protected $table = 'cne_estados';

	protected $fillable = [
		'estado'
	];

	public function cne_parroquias()
	{
		return $this->hasMany(CneParroquia::class, 'estado_id');
	}

	public function cne_municipios()
	{
		return $this->hasMany(CneMunicipio::class, 'estado_id');
	}

	public function nucleos()
	{
		return $this->hasMany(Nucleo::class, 'estado_id');
	}

	public function electores()
	{
		return $this->hasMany(Electore::class);
	}
}
