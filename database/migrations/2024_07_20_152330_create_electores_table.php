<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('electores', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('cedula')->unique('electores_cedula_key');
            $table->integer('cne_estado_id');
            $table->integer('cne_municipio_id')->nullable();
            $table->integer('cne_parroquia_id')->nullable();
            $table->integer('nucleo_id');
            $table->integer('tipo_elector_id');
            $table->integer('formacion_id')->default(1);
            $table->string('nombres', 100);
            $table->string('telefono', 100)->nullable();
            $table->string('email', 100)->nullable();
            $table->boolean('voto')->nullable();
            $table->time('hora_voto', 6)->nullable();
            $table->text('observaciones')->nullable();
            $table->timestamp('created_at', 6)->nullable()->default(DB::raw("now()"));
            $table->timestamp('updated_at', 6)->nullable();
            $table->softDeletes('deleted_at', 6);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('electores');
    }
};
