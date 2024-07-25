<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cne_estados', function (Blueprint $table) {
            $table->increments('id');
            $table->text('estado');
            $table->timestamp('created_at', 6)->nullable()->default(DB::raw("now()"));
            $table->timestamp('updated_at', 6)->nullable();
            $table->softDeletes('deleted_at', 6);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cne_estados');
    }
};
