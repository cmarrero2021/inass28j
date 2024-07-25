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
        DB::statement("CREATE VIEW \"vcumplimiento_dependencia\" AS  SELECT c.gabinete,
    d.ente,
    b.nombre_dependencia,
    a.id_dependencia,
    count(a.cedula) AS total,
    ( SELECT count(x.cedula) AS count
           FROM trabajadores x
          WHERE ((x.id_dependencia = a.id_dependencia) AND x.voto)) AS voto,
        CASE
            WHEN (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_dependencia = a.id_dependencia)) > 0) THEN ((((( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE ((x.id_dependencia = a.id_dependencia) AND x.voto)))::double precision / (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_dependencia = a.id_dependencia)))::double precision) * (100)::double precision))::numeric(5,2)
            ELSE 0.00
        END AS porc_voto,
    ( SELECT count(x.cedula) AS count
           FROM trabajadores x
          WHERE ((x.id_dependencia = a.id_dependencia) AND ((NOT x.voto) OR (x.voto IS NULL)))) AS no_voto,
        CASE
            WHEN (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_dependencia = a.id_dependencia)) > 0) THEN ((((( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE ((x.id_dependencia = a.id_dependencia) AND ((NOT x.voto) OR (x.voto IS NULL)))))::double precision / (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_dependencia = a.id_dependencia)))::double precision) * (100)::double precision))::numeric(5,2)
            ELSE 0.00
        END AS porc_no_voto
   FROM (((trabajadores a
     LEFT JOIN gabinetes c ON ((c.id_gabinete = a.id_gabinete)))
     LEFT JOIN entes d ON ((d.id_ente = a.id_ente)))
     LEFT JOIN dependencias b ON ((b.id_dependencia = a.id_dependencia)))
  WHERE (b.nombre_dependencia IS NOT NULL)
  GROUP BY c.gabinete, d.ente, b.nombre_dependencia, a.id_dependencia
  ORDER BY c.gabinete, d.ente, b.nombre_dependencia;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS \"vcumplimiento_dependencia\"");
    }
};
