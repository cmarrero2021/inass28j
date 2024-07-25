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
        DB::statement("CREATE VIEW \"vmeta_dependencia\" AS  SELECT row_number() OVER (ORDER BY b.nombre_dependencia) AS id_metadep,
    c.gabinete,
    d.ente,
    b.nombre_dependencia AS dependencia,
    count(a.cedula) AS meta,
    b.id_dependencia
   FROM (((trabajadores a
     LEFT JOIN gabinetes c ON ((c.id_gabinete = a.id_gabinete)))
     LEFT JOIN entes d ON ((d.id_ente = a.id_ente)))
     LEFT JOIN dependencias b ON ((b.id_dependencia = a.id_dependencia)))
  GROUP BY c.gabinete, d.ente, b.nombre_dependencia, b.id_dependencia
  ORDER BY c.gabinete, d.ente, b.nombre_dependencia;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS \"vmeta_dependencia\"");
    }
};
