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
        Schema::table('dependencias', function (Blueprint $table) {
            $table->foreign(['id_ente'], 'fkey_entes_dependencias')->references(['id_ente'])->on('entes');
            $table->foreign(['id_gabinete'], 'fkey_gabinetes_dependencias')->references(['id_gabinete'])->on('gabinetes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('dependencias', function (Blueprint $table) {
            $table->dropForeign('fkey_entes_dependencias');
            $table->dropForeign('fkey_gabinetes_dependencias');
        });
    }
};
