<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class LogoutController extends Controller
{
    public function __invoke(Request $request)
    {
        try {
            $token = JWTAuth::getToken();
            if (!$token) {
                return response()->json(['message' => 'No se otorgó un token'], 400);
            }
            JWTAuth::invalidate($token);
            return response()->json(['message' => 'Success logged out!']);
        } catch (JWTException $exception) {
            return response()->json(['message' => 'token not found'], status: 500);
        }
    }
}
