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
        DB::statement("CREATE VIEW \"vtrabajadores\" AS  SELECT a.cedula,
    a.nombre,
    b.estado,
    c.municipio,
    d.circuito,
    e.parroquia,
    f.gabinete,
    g.ente,
    h.nombre_dependencia,
    a.telfono,
    a.voto,
    a.\"1x10\",
    a.observaciones,
    a.hora_voto
   FROM (((((((trabajadores a
     LEFT JOIN estados b ON ((b.id_estado = a.id_estado)))
     LEFT JOIN municipios c ON ((c.id_municipio = a.id_municipio)))
     LEFT JOIN circuitos d ON ((d.id_circuito = a.id_circuito)))
     LEFT JOIN parroquias e ON ((e.id_parroquia = a.id_parroquia)))
     LEFT JOIN gabinetes f ON ((f.id_gabinete = a.id_gabinete)))
     LEFT JOIN entes g ON ((g.id_ente = a.id_ente)))
     LEFT JOIN dependencias h ON ((h.id_dependencia = a.id_dependencia)))
  ORDER BY a.cedula;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS \"vtrabajadores\"");
    }
};
