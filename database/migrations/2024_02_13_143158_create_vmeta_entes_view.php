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
        DB::statement("CREATE VIEW \"vmeta_entes\" AS  SELECT row_number() OVER (ORDER BY b.ente) AS id_metagab,
    c.gabinete,
    b.ente,
    count(a.cedula) AS meta,
    b.id_ente
   FROM ((trabajadores a
     LEFT JOIN entes b ON ((b.id_ente = a.id_ente)))
     LEFT JOIN gabinetes c ON ((c.id_gabinete = a.id_gabinete)))
  GROUP BY c.gabinete, b.ente, b.id_ente
  ORDER BY c.gabinete, b.ente;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS \"vmeta_entes\"");
    }
};
