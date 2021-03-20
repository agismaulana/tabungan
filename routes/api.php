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
Route::post('/send-login', 'App\Http\Controllers\AuthController@login');

//Home
Route::get('/jumlah', 'App\Http\Controllers\HomeController@getCount');

// Nasabah
Route::get('/nasabah', 'App\Http\Controllers\NasabahController@index');
Route::get('/where-nasabah/{kd_nasabah}', 'App\Http\Controllers\NasabahController@show');
Route::post('/tambah-nasabah', 'App\Http\Controllers\NasabahController@tambah');
Route::post('/update-nasabah', 'App\Http\Controllers\NasabahController@update');
Route::delete('/delete-nasabah/{kd_nasabah}', 'App\Http\Controllers\NasabahController@hapus');

// Pegawai
Route::get('/pegawai', 'App\Http\Controllers\PegawaiController@index');
Route::get('/where-pegawai/{kd_pegawai}', 'App\Http\Controllers\PegawaiController@show');
Route::post('/tambah-pegawai', 'App\Http\Controllers\PegawaiController@tambah');
Route::post('/update-pegawai', 'App\Http\Controllers\PegawaiController@update');
Route::delete('/delete-pegawai/{kd_pegawai}', 'App\Http\Controllers\PegawaiController@hapus');

// Users
Route::get('/users', 'App\Http\Controllers\UsersController@index');
Route::get('/where-users/{id_users}', 'App\Http\Controllers\UsersController@show');
Route::post('/update-users', 'App\Http\Controllers\UsersController@update');

// Data User
Route::get('/join-nasabah/{id_users}', 'App\Http\Controllers\UsersController@joinNasabah');
Route::get('/join-pegawai/{id_users}', 'App\Http\Controllers\UsersController@joinPegawai');
Route::get('/no-rekening/{kd_nasabah}', 'App\http\Controllers\UsersController@getNoRekening');

// Rekening
Route::get('/rekening', 'App\Http\Controllers\RekeningController@index');
Route::get('/where-rekening/{no_rekening}', 'App\Http\Controllers\RekeningController@show');
Route::post('/edit-rekening', 'App\Http\Controllers\RekeningController@update');
Route::post('/transaksi', 'App\Http\Controllers\RekeningController@transaksi');
Route::get('/exportPdfTransaksi/{no_rekening}', 'App\Http\Controllers\RekeningController@exportPdf');
Route::get('/exportExcelTransaksi/{no_rekening}', 'App\Http\Controllers\RekeningController@exportExcel');


// Buka Rekening
Route::get('/buka-rekening/{no_rekening}', 'App\Http\Controllers\RekeningController@getDataRekening');
Route::get('/transaksi', 'App\Http\Controllers\TransaksiController@index');
Route::get('/where-history-transaksi/{no_rekening}', 'App\Http\Controllers\TransaksiController@getWhereTransaksi');