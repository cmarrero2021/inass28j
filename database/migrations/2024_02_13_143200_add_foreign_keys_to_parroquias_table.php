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
        Schema::table('parroquias', function (Blueprint $table) {
            $table->foreign(['cod_estado', 'cod_municipio'], 'fky_municipios_parroquias')->references(['cod_estado', 'cod_municipio'])->on('municipios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('parroquias', function (Blueprint $table) {
            $table->dropForeign('fky_municipios_parroquias');
        });
    }
};
