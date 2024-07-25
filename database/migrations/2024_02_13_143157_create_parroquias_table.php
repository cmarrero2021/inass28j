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
        Schema::create('parroquias', function (Blueprint $table) {
            $table->increments('id_parroquia');
            $table->integer('cod_estado');
            $table->integer('cod_municipio');
            $table->integer('cod_parroquia');
            $table->string('parroquia', 30);
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->nullable();
            $table->softDeletes();

            $table->unique(['cod_estado', 'cod_municipio', 'cod_parroquia'], 'idx_est_mun_par');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('parroquias');
    }
};
