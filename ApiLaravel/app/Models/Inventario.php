<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventario extends Model
{
    protected $table = "inventario";

    protected $fillable = [
        'accion',
        'producto_id',
        'ganancia',
    ];

    public $timestamps = true;
}
