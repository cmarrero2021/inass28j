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
        DB::statement("CREATE VIEW \"vtrabajadores_votaron\" AS 
        SELECT 
            row_number() OVER (ORDER BY electores.hora_voto) AS \"No.\",
            electores.hora_voto,
            electores.cedula,
            electores.nombres,
            electores.telefono
        FROM 
            electores
        WHERE 
            electores.voto
        ORDER BY 
            electores.cedula;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS \"vtrabajadores_votaron\"");
    }
};
