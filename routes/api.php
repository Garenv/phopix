<?php

use App\Http\Controllers\Api\EmailVerificationController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\WinnersController;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\PrizesController;
use App\Http\Controllers\FaqController;
use Illuminate\Support\Facades\Cache;

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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login',                                    [AuthController::class,       'login']);
Route::post('register',                                 [AuthController::class,       'register']);
Route::post('forgot-password',                          [AuthController::class,       'submitForgotPasswordForm']);
Route::post('support',                                  [SupportController::class,    'support']);
Route::get('prizes',                                    [PrizesController::class,     'getPrizes']);
Route::get('get-all-legacy-winners',                    [WinnersController::class,    'getAllWinnersFromLegacyWinnersTable']);
Route::get('get-faq',                                   [FaqController::class,        'getFaq']);

Route::post('email/verification-notification', [EmailVerificationController::class, 'sendVerificationEmail'])->middleware('auth:sanctum');
Route::get('verify-email/{id}/{hash}', [EmailVerificationController::class, 'verify'])->name('verification.verify')->middleware('auth:sanctum');

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get( 'get-user-uploads-data',                [UsersController::class,      'getUserUploadsData']);
    Route::post('file-upload',                          [FileUploadController::class, 'fileUpload']);
    Route::post('logout',                               [AuthController::class,       'logout']);
    Route::get('get-user-like',                         [UsersController::class,      'getUserLikes']);
    Route::get('choose-winners',                        [WinnersController::class,    'getTopThreeWinnersFromUploadsTable']);
    Route::get('get-winners',                           [WinnersController::class,    'getTopThreeWinnersFromWinnersTable']);
    Route::post('like',                                 [UsersController::class,      'handleLike']);
    Route::post('dislike',                              [UsersController::class,      'handleDislike']);
    Route::delete('delete-user-upload',                 [UsersController::class,      'deleteUserUpload']);
    Route::get('get-data-from-userlikes-table',         [UsersController::class,      'getDataFromUserLikesTable']);
    Route::get('get-user-data',                         [UsersController::class,      'getUserData']);
    Route::post('change-password',                      [AuthController::class,       'changePassword']);
    Route::post('update-email',                         [UsersController::class,      'updateEmail']);
});

