<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function (): void {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('api.token')->prefix('auth')->group(function (): void {
    Route::post('/profile', [AuthController::class, 'updateProfile']);
});

Route::middleware('api.token')->prefix('dashboard')->group(function (): void {
    Route::get('/overview', [DashboardController::class, 'overview']);
});

Route::middleware('api.token')->prefix('transactions')->group(function (): void {
    Route::get('/', [TransactionController::class, 'index']);
    Route::post('/', [TransactionController::class, 'store']);
    Route::put('/{transaction}', [TransactionController::class, 'update']);
    Route::delete('/{transaction}', [TransactionController::class, 'destroy']);
});
