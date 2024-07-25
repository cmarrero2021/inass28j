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
        Schema::create('cne_municipios', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('estado_id')->index('idx_cne_munipiso_estados');
            $table->integer('municipio_id');
            $table->text('municipio');
            $table->timestamp('created_at', 6)->nullable()->default(DB::raw("now()"));
            $table->timestamp('updated_at', 6)->nullable();
            $table->softDeletes('deleted_at', 6);

            $table->unique(['estado_id', 'municipio_id'], 'idx_municxipios_full');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cne_municipios');
    }
};
