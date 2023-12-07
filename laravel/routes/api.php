<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CategoryBookController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\BookHistoryController;
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

// Route::middleware(['auth:sanctum', 'role:user'])->get('/user-current', function (Request $request) {
//     // return $request->user();
//     return response()->json('sadfsadf');
// });
Route::middleware(['auth:sanctum', 'can:isManager'])->get('/user-current', function (Request $request) {
    return response()->json(auth()->user());
});

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => 'company', 'middleware' => ['can:isAdmin']], function () {
        Route::get('/', [CompanyController::class, 'index']);
        Route::post('/', [CompanyController::class, 'store']);
        Route::delete('/', [CompanyController::class, 'destroyAll']);
        Route::delete('/{id}', [CompanyController::class, 'destroy']);
        // Route::get('/{id}', [CompanyController::class, 'show']);// note bi de vo route getall
        Route::put('/{id}', [CompanyController::class, 'update']);
        Route::get('/all', [CompanyController::class, 'getAll']);
    });

    Route::group(['prefix' => 'department', 'middleware' => ['can:isAdmin']], function () {
        Route::post('/', [DepartmentController::class, 'store']);
        Route::get('/', [DepartmentController::class, 'index']);
        Route::get('/count', [DepartmentController::class, 'getCount']);
        Route::put('/{id}', [DepartmentController::class, 'update']);
        Route::delete('/', [DepartmentController::class, 'destroyAll']);
        Route::delete('/{id}', [DepartmentController::class, 'destroy']);
        Route::get('/all', [DepartmentController::class, 'getAll']);
    });

    Route::group(['prefix' => 'role', 'middleware' => ['can:isAdmin']], function () {
        Route::post('/', [RoleController::class, 'store']);
        Route::get('/', [RoleController::class, 'index']);
        Route::put('/{id}', [RoleController::class, 'update']);
        Route::delete('/{id}', [RoleController::class, 'destroy']);
    });

    Route::group(['prefix' => 'user', 'middleware' => ['can:isAdmin']], function () {
        Route::post('/', [UserController::class, 'store']);
        Route::get('/', [UserController::class, 'index']);
        // Route::get('/count', [DepartmentController::class, 'getCount']);
        Route::put('/{id}', [UserController::class, 'update']);
        Route::delete('/', [UserController::class, 'destroyAll']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
        // Route::get('/all', [DepartmentController::class, 'getAll']);
    });

    Route::group(['prefix' => 'category-book', 'middleware' => ['can:isManager']], function () {
        Route::post('/', [CategoryBookController::class, 'store']);
        Route::get('/', [CategoryBookController::class, 'index']);
        // Route::get('/count', [DepartmentController::class, 'getCount']);
        Route::put('/{id}', [CategoryBookController::class, 'update']);
        Route::delete('/', [CategoryBookController::class, 'destroyAll']);
        Route::delete('/{id}', [CategoryBookController::class, 'destroy']);
        Route::get('/all', [CategoryBookController::class, 'getAll']);
    });

    Route::prefix('book')->group(function () {
        Route::post('/', [BookController::class, 'store'])->middleware('can:isManager');
        Route::get('/', [BookController::class, 'index']);
        Route::get('/{id}', [BookController::class, 'getOne']);
        Route::put('/{id}', [BookController::class, 'update'])->middleware('can:isManager');
        Route::delete('/', [BookController::class, 'destroyAll'])->middleware('can:isManager');
        Route::delete('/{id}', [BookController::class, 'destroy'])->middleware('can:isManager');
    });

    Route::prefix('book-history')->group(function () {
        Route::post('/', [BookHistoryController::class, 'store']);
//        Route::get('/', [BookController::class, 'index']);
//        Route::get('/{id}', [BookController::class, 'getOne']);
//        Route::put('/{id}', [BookController::class, 'update'])->middleware('can:isManager');
//        Route::delete('/', [BookController::class, 'destroyAll'])->middleware('can:isManager');
//        Route::delete('/{id}', [BookController::class, 'destroy'])->middleware('can:isManager');
    });
});
