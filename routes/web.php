<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\ReactController;

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

//Route::get('/{path?}',               [ReactController::class, 'show'])->name('routes');

// When refreshing the page while on a React Router route, you went get a 404 error when refreshing
Route::view('{path}', 'app')->where('path', '([A-z\d\-\/_.]+)?');

Route::get('reset-password/{token}', [AuthController::class, 'showResetPasswordForm'])->name('reset.password.get');;
Route::post('reset-password',        [AuthController::class, 'submitResetPasswordForm'])->name('reset.password.post');

