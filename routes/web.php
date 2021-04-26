<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', fn () => inertia('Home/index', []))->name('home');

Route::get('/login', fn () => inertia('Login', []))->name('login');

Route::get('/messages', fn () => inertia('Message', []))->name('messages');
