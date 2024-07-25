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
        DB::statement("CREATE VIEW \"vtrabajadores_no_votaron\" AS  SELECT row_number() OVER (ORDER BY trabajadores.hora_voto, dependencias.nombre_dependencia) AS \"No.\",
    gabinetes.gabinete,
    entes.ente,
    dependencias.nombre_dependencia,
    trabajadores.cedula,
    trabajadores.nombre,
    trabajadores.telfono
   FROM (((trabajadores
     LEFT JOIN gabinetes ON ((gabinetes.id_gabinete = trabajadores.id_gabinete)))
     LEFT JOIN entes ON ((entes.id_ente = trabajadores.id_ente)))
     LEFT JOIN dependencias ON ((dependencias.id_dependencia = trabajadores.id_dependencia)))
  WHERE ((NOT trabajadores.voto) OR (trabajadores.voto IS NULL))
  ORDER BY gabinetes.gabinete, entes.ente, dependencias.nombre_dependencia, trabajadores.cedula;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS \"vtrabajadores_no_votaron\"");
    }
};
