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
        DB::statement("CREATE VIEW \"vcunplimiento_parroquia\" AS  SELECT b.parroquia,
    a.id_parroquia,
    count(a.cedula) AS total,
    ( SELECT count(x.cedula) AS count
           FROM trabajadores x
          WHERE ((x.id_parroquia = a.id_parroquia) AND x.voto)) AS voto,
        CASE
            WHEN (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_parroquia = a.id_parroquia)) > 0) THEN ((((( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE ((x.id_parroquia = a.id_parroquia) AND x.voto)))::double precision / (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_parroquia = a.id_parroquia)))::double precision) * (100)::double precision))::numeric(5,2)
            ELSE 0.00
        END AS porc_voto,
    ( SELECT count(x.cedula) AS count
           FROM trabajadores x
          WHERE ((x.id_parroquia = a.id_parroquia) AND ((NOT x.voto) OR (x.voto IS NULL)))) AS no_voto,
        CASE
            WHEN (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_parroquia = a.id_parroquia)) > 0) THEN ((((( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE ((x.id_parroquia = a.id_parroquia) AND ((NOT x.voto) OR (x.voto IS NULL)))))::double precision / (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_parroquia = a.id_parroquia)))::double precision) * (100)::double precision))::numeric(5,2)
            ELSE 0.00
        END AS porc_no_voto
   FROM (trabajadores a
     LEFT JOIN parroquias b ON ((b.cod_parroquia = a.id_parroquia)))
  WHERE ((b.parroquia IS NOT NULL) AND (b.cod_estado = 1) AND (b.cod_municipio = 1))
  GROUP BY b.parroquia, a.id_parroquia
  ORDER BY b.parroquia;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS \"vcunplimiento_parroquia\"");
    }
};
