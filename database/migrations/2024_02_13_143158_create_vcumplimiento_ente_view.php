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
        DB::statement("CREATE VIEW \"vcumplimiento_ente\" AS  SELECT c.gabinete,
    b.ente,
    a.id_ente,
    count(a.cedula) AS total,
    ( SELECT count(x.cedula) AS count
           FROM trabajadores x
          WHERE ((x.id_ente = a.id_ente) AND x.voto)) AS voto,
        CASE
            WHEN (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_ente = a.id_ente)) > 0) THEN ((((( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE ((x.id_ente = a.id_ente) AND x.voto)))::double precision / (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_ente = a.id_ente)))::double precision) * (100)::double precision))::numeric(5,2)
            ELSE 0.00
        END AS porc_voto,
    ( SELECT count(x.cedula) AS count
           FROM trabajadores x
          WHERE ((x.id_ente = a.id_ente) AND ((NOT x.voto) OR (x.voto IS NULL)))) AS no_voto,
        CASE
            WHEN (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_ente = a.id_ente)) > 0) THEN ((((( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE ((x.id_ente = a.id_ente) AND ((NOT x.voto) OR (x.voto IS NULL)))))::double precision / (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_ente = a.id_ente)))::double precision) * (100)::double precision))::numeric(5,2)
            ELSE 0.00
        END AS porc_no_voto
   FROM ((trabajadores a
     LEFT JOIN gabinetes c ON ((c.id_gabinete = a.id_gabinete)))
     LEFT JOIN entes b ON ((b.id_ente = a.id_ente)))
  WHERE (b.ente IS NOT NULL)
  GROUP BY c.gabinete, b.ente, a.id_ente
  ORDER BY c.gabinete, b.ente;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS \"vcumplimiento_ente\"");
    }
};
