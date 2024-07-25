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
        DB::statement("CREATE VIEW \"vmeta_gabinete\" AS  SELECT row_number() OVER (ORDER BY b.gabinete) AS id_metagab,
    b.gabinete,
    count(a.cedula) AS meta,
    b.id_gabinete
   FROM (trabajadores a
     LEFT JOIN gabinetes b ON ((b.id_gabinete = a.id_gabinete)))
  GROUP BY b.gabinete, b.id_gabinete
  ORDER BY b.gabinete;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS \"vmeta_gabinete\"");
    }
};
