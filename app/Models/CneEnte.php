<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class CneEnte
 * 
 * @property int $id
 * @property int $cedula
 * @property string $nombre
 * @property string $estado
 * @property string $municipio
 * @property string $parroquia
 * @property string $centro
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 *
 * @package App\Models
 */
class CneEnte extends Model
{
	use SoftDeletes;
	protected $table = 'cne_entes';

	protected $casts = [
		'cedula' => 'int'
	];

	protected $fillable = [
		'cedula',
		'nombre',
		'estado',
		'municipio',
		'parroquia',
		'centro'
	];
}
