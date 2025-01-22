<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inventario', function (Blueprint $table) {
            $table->increments('id'); // Clave primaria
            $table->string('accion');
            // Clave foránea hacia 'productos'
            $table
                ->unsignedInteger('producto_id');
            $table
                ->foreign('producto_id')
                ->references('id')
                ->on('productos')
                ->onDelete('cascade');
            $table->float('ganancia')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("inventario");
    }
};
