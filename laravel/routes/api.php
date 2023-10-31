<?php

use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\SeedingDataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('company')->group(function () {
    Route::get('/', [CompanyController::class, 'index']);
    Route::post('/', [CompanyController::class, 'store']);
    Route::delete('/', [CompanyController::class, 'destroyAll']);
    Route::delete('/{id}', [CompanyController::class, 'destroy']);
    // Route::get('/{id}', [CompanyController::class, 'show']);// note bi de vo route getall
    Route::put('/{id}', [CompanyController::class, 'update']);
    Route::get('/all', [CompanyController::class, 'getAll']);
});

Route::prefix('department')->group(function () {
    Route::post('/', [DepartmentController::class, 'store']);
    Route::get('/', [DepartmentController::class, 'index']);
    Route::get('/count', [DepartmentController::class, 'getCount']);
    Route::put('/{id}', [DepartmentController::class, 'update']);
    Route::delete('/', [DepartmentController::class, 'destroyAll']);
    Route::delete('/{id}', [DepartmentController::class, 'destroy']);
    Route::get('/all', [DepartmentController::class, 'getAll']);
});

Route::prefix('role')->group(function () {
    Route::post('/', [RoleController::class, 'store']);
    Route::get('/', [RoleController::class, 'index']);
    Route::put('/{id}', [RoleController::class, 'update']);
    Route::delete('/{id}', [RoleController::class, 'destroy']);
});

Route::prefix('user')->group(function () {
    Route::post('/', [UserController::class, 'store']);
    Route::get('/', [UserController::class, 'index']);
    // Route::get('/count', [DepartmentController::class, 'getCount']);
    // Route::put('/{id}', [DepartmentController::class, 'update']);
    // Route::delete('/', [DepartmentController::class, 'destroyAll']);
    // Route::delete('/{id}', [DepartmentController::class, 'destroy']);
    // Route::get('/all', [DepartmentController::class, 'getAll']);
});

//seed data
Route::post('seed-data', [SeedingDataController::class, 'seed']);
