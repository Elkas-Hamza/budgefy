<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('pages.landing');
})->name('landing');

Route::view('/dashboard', 'pages.dashboard')->name('dashboard');
Route::view('/transactions', 'pages.transactions')->name('transactions');
Route::view('/categories', 'pages.categories')->name('categories');
Route::view('/login', 'pages.auth')->name('login');
Route::view('/settings', 'pages.settings')->name('settings');
