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
        Schema::create('centros', function (Blueprint $table) {
            $table->smallInteger('cod_estado')->index('idx_estado_centros');
            $table->smallInteger('cod_municipio')->index('idx_municipio_centros');
            $table->smallInteger('cod_parroquia')->index('idx_parroquia_centros');
            $table->bigInteger('cod_centro')->primary();
            $table->integer('cod_viejo')->nullable();
            $table->text('nombre_centro')->nullable();
            $table->text('direccion_centro')->nullable();
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->nullable();
            $table->softDeletes();

            $table->unique(['cod_estado', 'cod_municipio', 'cod_parroquia', 'cod_centro'], 'idx_est_mun_par_cen');
            $table->unique(['cod_estado', 'cod_municipio', 'cod_parroquia', 'cod_centro'], 'idx_full_centros');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('centros');
    }
};
