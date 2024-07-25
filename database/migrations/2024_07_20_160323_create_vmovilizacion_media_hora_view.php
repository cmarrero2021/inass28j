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
        DB::statement("CREATE VIEW \"vmovilizacion_media_hora\" AS  SELECT intervalo AS hora,
    votantes AS cant,
    sum(sum(votantes)) OVER (ORDER BY intervalo) AS acumulado
   FROM ( SELECT (timezone('UTC'::text, to_timestamp((floor((date_part('epoch'::text, electores.hora_voto) / (1800)::double precision)) * (1800)::double precision))))::time without time zone AS intervalo,
            count(*) AS votantes
           FROM electores
          WHERE electores.voto
          GROUP BY ((timezone('UTC'::text, to_timestamp((floor((date_part('epoch'::text, electores.hora_voto) / (1800)::double precision)) * (1800)::double precision))))::time without time zone)
          ORDER BY ((timezone('UTC'::text, to_timestamp((floor((date_part('epoch'::text, electores.hora_voto) / (1800)::double precision)) * (1800)::double precision))))::time without time zone)) acum
  GROUP BY intervalo, votantes;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS \"vmovilizacion_media_hora\"");
    }
};
