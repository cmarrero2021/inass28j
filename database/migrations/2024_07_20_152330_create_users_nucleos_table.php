<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users_nucleos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->index('users_nucleos_user_id_idx');
            $table->integer('nucleo_id')->index('users_nucleos_nucleo_id_idx');

            $table->index(['id', 'user_id', 'nucleo_id'], 'users_nucleos_full_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_nucleos');
    }
};
