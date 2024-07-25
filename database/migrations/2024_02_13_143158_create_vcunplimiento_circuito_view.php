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
        DB::statement("CREATE VIEW \"vcunplimiento_circuito\" AS  SELECT b.circuito,
    a.id_circuito,
    count(a.cedula) AS total,
    ( SELECT count(x.cedula) AS count
           FROM trabajadores x
          WHERE ((x.id_circuito = a.id_circuito) AND x.voto)) AS voto,
        CASE
            WHEN (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_circuito = a.id_circuito)) > 0) THEN ((((( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE ((x.id_circuito = a.id_circuito) AND x.voto)))::double precision / (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_circuito = a.id_circuito)))::double precision) * (100)::double precision))::numeric(5,2)
            ELSE 0.00
        END AS porc_voto,
    ( SELECT count(x.cedula) AS count
           FROM trabajadores x
          WHERE ((x.id_circuito = a.id_circuito) AND ((NOT x.voto) OR (x.voto IS NULL)))) AS no_voto,
        CASE
            WHEN (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_circuito = a.id_circuito)) > 0) THEN ((((( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE ((x.id_circuito = a.id_circuito) AND ((NOT x.voto) OR (x.voto IS NULL)))))::double precision / (( SELECT count(x.cedula) AS count
               FROM trabajadores x
              WHERE (x.id_circuito = a.id_circuito)))::double precision) * (100)::double precision))::numeric(5,2)
            ELSE 0.00
        END AS porc_no_voto
   FROM (trabajadores a
     LEFT JOIN circuitos b ON ((b.id_circuito = a.id_circuito)))
  WHERE (b.circuito IS NOT NULL)
  GROUP BY b.circuito, a.id_circuito
  ORDER BY b.circuito;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS \"vcunplimiento_circuito\"");
    }
};
