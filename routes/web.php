<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChatController;

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

Route::get('/login', [AuthController::class, 'showLogin'])->middleware('guest')->name('login');
Route::get('/users', [UserController::class, 'index'])->name('users');

Route::group(['middleware' => ['auth:web']], function () {
  Route::get('/chat',     [ChatController::class, 'chat'])->name('chat');
  Route::post('/logout',  [AuthController::class, 'logout'])->name('logout');
});
