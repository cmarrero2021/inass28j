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
        Schema::create('municipios', function (Blueprint $table) {
            $table->increments('id_municipio');
            $table->integer('cod_estado');
            $table->integer('cod_municipio');
            $table->string('municipio', 30);
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->nullable();
            $table->softDeletes();

            $table->unique(['cod_estado', 'cod_municipio'], 'idx_estados_municipios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('municipios');
    }
};
