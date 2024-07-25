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
        DB::statement("CREATE VIEW \"vcumplimiento_gabinete\" AS  SELECT b.gabinete,
    a.id_gabinete,
    count(a.cedula) AS total,
    ( SELECT count(x.cedula) AS count
           FROM trabajadores x
          WHERE ((x.id_gabinete = a.id_gabinete) AND x.voto)) AS voto,
        CASE
            WHEN (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_gabinete = a.id_gabinete)) > 0) THEN ((((( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE ((x.id_gabinete = a.id_gabinete) AND x.voto)))::double precision / (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_gabinete = a.id_gabinete)))::double precision) * (100)::double precision))::numeric(5,2)
            ELSE 0.00
        END AS porc_voto,
    ( SELECT count(x.cedula) AS count
           FROM trabajadores x
          WHERE ((x.id_gabinete = a.id_gabinete) AND ((NOT x.voto) OR (x.voto IS NULL)))) AS no_voto,
        CASE
            WHEN (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_gabinete = a.id_gabinete)) > 0) THEN ((((( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE ((x.id_gabinete = a.id_gabinete) AND ((NOT x.voto) OR (x.voto IS NULL)))))::double precision / (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_gabinete = a.id_gabinete)))::double precision) * (100)::double precision))::numeric(5,2)
            ELSE 0.00
        END AS porc_no_voto
   FROM (trabajadores a
     LEFT JOIN gabinetes b ON ((b.id_gabinete = a.id_gabinete)))
  WHERE (b.gabinete IS NOT NULL)
  GROUP BY b.gabinete, a.id_gabinete
  ORDER BY b.gabinete;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS \"vcumplimiento_gabinete\"");
    }
};
