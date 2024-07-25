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
        Schema::create('cne_entes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('cedula');
            $table->string('nombre', 150);
            $table->string('estado', 50);
            $table->string('municipio', 150);
            $table->string('parroquia', 150);
            $table->string('centro', 150);
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cne_entes');
    }
};
