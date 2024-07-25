<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class UsersNucleo
 * 
 * @property int $id
 * @property int $user_id
 * @property int $nucleo_id
 * 
 * @property User $user
 * @property Nucleo $nucleo
 *
 * @package App\Models
 */
class UsersNucleo extends Model
{
	protected $table = 'users_nucleos';
	public $timestamps = false;

	protected $casts = [
		'user_id' => 'int',
		'nucleo_id' => 'int'
	];

	protected $fillable = [
		'user_id',
		'nucleo_id'
	];

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function nucleo()
	{
		return $this->belongsTo(Nucleo::class);
	}
}
