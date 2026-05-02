<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function (): void {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/email/verification-link', [AuthController::class, 'requestEmailVerificationLink'])->middleware('throttle:6,1');
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->middleware('throttle:6,1');
    Route::post('/verify-reset-code', [AuthController::class, 'verifyResetCode'])->middleware('throttle:6,1');
    Route::post('/reset-password', [AuthController::class, 'resetPassword'])->middleware('throttle:6,1');
    Route::get('/account/deletion/verify/{id}/{hash}', [AuthController::class, 'verifyAccountDeletion'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('account.deletion.verify');
    Route::get('/account/deletion/preview/{id}/{hash}', [AuthController::class, 'previewAccountDeletion'])
        ->middleware('throttle:10,1');
    Route::get('/verify-email/{id}/{hash}', [AuthController::class, 'verifyEmail'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('api.token')->prefix('auth')->group(function (): void {
    Route::post('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    Route::post('/account/deletion-request', [AuthController::class, 'requestAccountDeletion'])->middleware('throttle:3,1');
    Route::get('/account/deletion-status', [AuthController::class, 'accountDeletionStatus']);
    Route::delete('/account', [AuthController::class, 'deleteAccount']);
    Route::post('/email/verification-notification', [AuthController::class, 'sendEmailVerificationNotification'])
        ->middleware('throttle:6,1')
        ->name('verification.send');
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

Route::middleware('api.token')->prefix('categories')->group(function (): void {
    Route::get('/', [CategoryController::class, 'index']);
    Route::post('/', [CategoryController::class, 'store']);
    Route::put('/{category}', [CategoryController::class, 'update']);
    Route::delete('/{category}', [CategoryController::class, 'destroy']);
});
