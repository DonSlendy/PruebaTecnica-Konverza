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
        Schema::create('productos',function(Blueprint $table){
            $table->increments('id');
            $table->string('nombre');
            $table->string('descrip');
            $table->integer('cantidad');
            $table->float('precio');
            //$table->binary('img');
            $table
                ->foreignId('usuario_id')
                ->constrained('users')
                ->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
