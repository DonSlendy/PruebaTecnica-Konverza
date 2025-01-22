<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Inventario;
use Illuminate\Http\Request;

class InventarioController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function agregarUnInventario(Request $request)
    {
        $request->validate([
            'accion' => 'required|string',
            'producto_id' => 'required|numeric',
            'ganancia' => 'nullable|decimal:0,2|min:0',
        ]);

        Inventario::create($request->all());

        return response()->json("Agregado exitosamente", 201);
    }

    public function listarInventario()
    {
        $userProducto = Inventario::get();

        return response()->json(
            $userProducto,
            200
        );
    }
}
