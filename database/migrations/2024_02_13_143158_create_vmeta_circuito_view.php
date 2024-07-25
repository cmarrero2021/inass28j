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
        DB::statement("CREATE VIEW \"vmeta_circuito\" AS  SELECT a.id_circuito,
    b.circuito,
    count(a.cedula) AS count
   FROM (trabajadores a
     LEFT JOIN circuitos b ON ((b.id_circuito = a.id_circuito)))
  WHERE (a.id_circuito > 0)
  GROUP BY a.id_circuito, b.circuito
  ORDER BY a.id_circuito;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS \"vmeta_circuito\"");
    }
};
