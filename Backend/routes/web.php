<?php

use App\Http\Controllers\SocialAuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('pages.landing');
})->name('landing');

Route::view('/dashboard', 'pages.dashboard')->name('dashboard');
Route::view('/transactions', 'pages.transactions')->name('transactions');
Route::view('/categories', 'pages.categories')->name('categories');
Route::view('/login', 'pages.auth')->name('login');
Route::view('/settings', 'pages.settings')->name('settings');
Route::view('/admin', 'pages.admin.login')->name('admin.login');
Route::view('/admin/dashboard', 'pages.admin.dashboard')->name('admin.dashboard');

Route::get('/auth/redirect/{provider}', [SocialAuthController::class, 'redirect'])->name('social.redirect');
Route::get('/auth/callback/{provider}', [SocialAuthController::class, 'callback'])->name('social.callback');
Route::get('/auth/{provider}/callback', [SocialAuthController::class, 'callback'])->name('social.callback.alt');
