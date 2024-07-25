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
        Schema::create('nucleos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('estado_id');
            $table->string('nucleo', 50);
            $table->timestamp('created_at')->nullable()->default(DB::raw("now()"));
            $table->timestamp('udated_at')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nucleos');
    }
};
