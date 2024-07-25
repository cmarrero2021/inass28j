<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class GdcEnte
 * 
 * @property int $cedula
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 *
 * @package App\Models
 */
class GdcEnte extends Model
{
	use SoftDeletes;
	protected $table = 'gdc_entes';
	protected $primaryKey = 'cedula';
	public $incrementing = false;

	protected $casts = [
		'cedula' => 'int'
	];
}
