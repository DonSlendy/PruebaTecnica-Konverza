<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;

class ProductosController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function listarProductos()
    {
        //Extrae el id del usuario
        $userID = auth('api')->id();

        $userProducto = Producto::where('usuario_id', $userID)->get();

        return response()->json(
            $userProducto,
            200
        );
    }

    public function seleccionarProducto($id)
    {
        $userProducto = Producto::where('id', $id)->first(); // Usa first() para obtener un único registro

        return response()->json(
            $userProducto,
            200
        );
    }

    public function agregarProducto(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'descrip' => 'required|string',
            'precio' => 'required|decimal:0,2|min:0',
            'cantidad' => 'required|numeric|min:0',
            'usuario_id' => 'required|numeric'
        ]);

        Producto::create($request->all());

        return response()->json("Agregado exitosamente", 201);
    }

    public function habastecerProducto(Request $request, $id)
    {
        $userID = auth('api')->id();

        $request->validate([
            'cantidad' => 'required|numeric|min:0',
        ]);

        $productoActualizado = Producto::where('id', $id)
            ->where('usuario_id', $userID)
            ->update($request->all());

        if ($productoActualizado) {
            return response()->json("Producto actualizado", 200);
        } else {
            return response()->json("No se pudo actualizar", 404);
        }
    }

    public function editarProducto(Request $request, $id)
    {
        $userID = auth('api')->id();

        $request->validate([
            'nombre' => 'required|string',
            'precio' => 'required|decimal:0,2|min:0',
            'descrip' => 'required|string'
        ]);

        $productoActualizado = Producto::where('id', $id)
            ->where('usuario_id', $userID)
            ->update($request->all());

        if ($productoActualizado) {
            return response()->json("Producto actualizado", 200);
        } else {
            return response()->json("No se pudo actualizar", 404);
        }
    }

    public function eliminarProducto($id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json('Este producto no existe', 404);
        }

        $producto->delete();
        return response()->json('Tarea eliminada satisfactoriamente', 200);
    }
}
