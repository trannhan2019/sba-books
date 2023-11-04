<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->only(['username', 'password']))) {
            return response()->json([
                'status' => false,
                'message' => 'Tài khoản & Mật khẩu không đúng.',
            ], 401);
        }
        $user = User::where('username', $request->username)->where('isActive', true)->with(['role' => function ($s) {
            $s->select('id', 'name');
        }, 'department' => function ($s) {
            $s->select('id', 'name', 'alias');
        }])->first();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Tài khoản đang tạm khoá.',
            ], 401);
        }
        return response()->json([
            'token' => $user->createToken("authToken")->plainTextToken,
            'user' => $user
        ], 200);
    }
}
