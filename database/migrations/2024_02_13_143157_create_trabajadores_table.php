<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trabajadores', function (Blueprint $table) {
            $table->integer('cedula')->primary();
            $table->string('nombre', 50);
            $table->integer('id_estado');
            $table->integer('id_municipio');
            $table->integer('id_circuito');
            $table->integer('id_parroquia');
            $table->integer('id_gabinete');
            $table->integer('id_ente');
            $table->integer('id_dependencia');
            $table->char('telfono', 12)->nullable();
            $table->boolean('voto')->nullable();
            $table->integer('1x10')->nullable();
            $table->text('observaciones')->nullable();
            $table->time('hora_voto', 6)->nullable();
            $table->timestamp('created_at', 6)->nullable()->useCurrent();
            $table->timestamp('updated_at')->nullable();
            $table->softDeletes('deleted_at', 6);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trabajadores');
    }
};
