<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\WinnersController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login',                                  [AuthController::class,       'login']);
Route::post('register',                               [AuthController::class,       'register']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get( 'get-user-uploads-data',              [UsersController::class,      'getUserUploadsData']);
    Route::post('file-upload',                        [FileUploadController::class, 'fileUpload']);
    Route::post('logout',                             [AuthController::class,       'logout']);
    Route::get('get-user-like',                       [UsersController::class,      'getUserLikes']);
    Route::get('choose-winners',                      [WinnersController::class,    'getTopThreeWinnersFromUploadsTable']);
    Route::get('get-winners',                         [WinnersController::class,    'getTopThreeWinnersFromWinnersTable']);
    Route::post('post-user-like',                     [UsersController::class,      'incrementDecrementLike']);
    Route::post('delete-user-upload',                 [UsersController::class,      'deleteUserUpload']);
});
