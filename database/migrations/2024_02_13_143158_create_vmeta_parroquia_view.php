<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("CREATE VIEW \"vmeta_parroquia\" AS  SELECT a.id_parroquia,
    b.parroquia,
    count(a.cedula) AS count
   FROM (trabajadores a
     LEFT JOIN parroquias b ON ((b.cod_parroquia = a.id_parroquia)))
  WHERE ((b.cod_estado = 1) AND (b.cod_municipio = 1))
  GROUP BY a.id_parroquia, b.parroquia
  ORDER BY b.parroquia;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS \"vmeta_parroquia\"");
    }
};
