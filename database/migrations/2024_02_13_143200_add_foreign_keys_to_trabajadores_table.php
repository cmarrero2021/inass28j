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
        Schema::table('trabajadores', function (Blueprint $table) {
            $table->foreign(['id_dependencia'], 'fkey_dependencia')->references(['id_dependencia'])->on('dependencias');
            $table->foreign(['id_ente'], 'fkey_ente')->references(['id_ente'])->on('entes');
            $table->foreign(['id_gabinete'], 'fkey_gabinete')->references(['id_gabinete'])->on('gabinetes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('trabajadores', function (Blueprint $table) {
            $table->dropForeign('fkey_dependencia');
            $table->dropForeign('fkey_ente');
            $table->dropForeign('fkey_gabinete');
        });
    }
};
