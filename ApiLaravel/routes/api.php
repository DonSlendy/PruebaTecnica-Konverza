<?php

use App\Http\Controllers\API\InventarioController;
use App\Http\Controllers\API\LoginController;
use App\Http\Controllers\api\LogoutController;
use App\Http\Controllers\API\ProductosController;
use App\Http\Controllers\api\TareasController;
use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth',
], function () {
    Route::post(uri: 'login', action: LoginController::class);
    Route::post(uri: 'logout', action: LogoutController::class);
});

Route::middleware('auth:api')->group(function () {
    //Rutas para los productos
    Route::get('misProductos', [ProductosController::class, 'listarProductos']);
    Route::get('seleccionarProducto/{id}', [ProductosController::class, 'seleccionarProducto']);
    Route::post('agregarProducto', [ProductosController::class, 'agregarProducto']);
    Route::put('editarProducto/{id}', [ProductosController::class, 'editarProducto']);
    Route::delete('eliminarProducto/{id}', [ProductosController::class, 'eliminarProducto']);

    //Esta ruta es especial porque modifica la cantidad del producto
    Route::put('habastecerProducto/{id}', [ProductosController::class, 'habastecerProducto']);

    //Rutas para el inventario
    Route::post('agregarUnInventario', [InventarioController::class, 'agregarUnInventario']);
    Route::get('listarInventario', [InventarioController::class, 'listarInventario']);


});
