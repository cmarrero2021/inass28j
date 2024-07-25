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
        Schema::create('cne_parroquias', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('estado_id')->index('idx_cne_parroquias_estados');
            $table->integer('municipio_id')->index('idx_cne_parroquias_municipios');
            $table->integer('parroquia_id');
            $table->text('parroquia');
            $table->timestamp('created_at', 6)->nullable()->default(DB::raw("now()"));
            $table->timestamp('updated_at', 6)->nullable();
            $table->softDeletes('deleted_at', 6);

            $table->index(['estado_id', 'municipio_id'], 'idx_cne_parroquias_estados_municiios');
            $table->index(['estado_id', 'municipio_id', 'parroquia_id'], 'idx_cne_parroquias_full');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cne_parroquias');
    }
};
