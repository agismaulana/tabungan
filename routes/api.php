<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Auth
Route::get('/users', 'App\Http\Controllers\AuthController@users');
Route::post('/send-login', 'App\Http\Controllers\AuthController@login');


// Nasabah
Route::get('/nasabah', 'App\Http\Controllers\NasabahController@index');
Route::post('/tambah-nasabah', 'App\Http\Controllers\NasabahController@tambah');

