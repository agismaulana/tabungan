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
Route::get('/change-status-nasabah/{kd_nasabah}', 'App\Http\Controllers\NasabahController@changeStatus');

// Pegawai
Route::get('/pegawai', 'App\Http\Controllers\PegawaiController@index');
Route::get('/where-pegawai/{kd_pegawai}', 'App\Http\Controllers\PegawaiController@show');
Route::post('/tambah-pegawai', 'App\Http\Controllers\PegawaiController@tambah');
Route::post('/update-pegawai', 'App\Http\Controllers\PegawaiController@update');
Route::delete('/delete-pegawai/{kd_pegawai}', 'App\Http\Controllers\PegawaiController@hapus');
Route::get('/change-status-pegawai/{kd_nasabah}', 'App\Http\Controllers\PegawaiController@changeStatus');

// Users
Route::get('/users', 'App\Http\Controllers\UsersController@index');
Route::get('/where-users/{id_users}', 'App\Http\Controllers\UsersController@show');
Route::post('/update-users', 'App\Http\Controllers\UsersController@update');

// Data Profile
Route::get('/join-nasabah/{id_users}', 'App\Http\Controllers\UsersController@joinNasabah');
Route::get('/join-pegawai/{id_users}', 'App\Http\Controllers\UsersController@joinPegawai');
Route::get('/no-rekening/{kd_nasabah}', 'App\http\Controllers\UsersController@getNoRekening');
Route::post('/update-profile', 'App\Http\Controllers\UsersController@updateProfile');
Route::post('/ubah-password', 'App\Http\Controllers\UsersController@ubahPassword');

// Rekening
Route::get('/rekening', 'App\Http\Controllers\RekeningController@index');
Route::get('/where-rekening/{no_rekening}', 'App\Http\Controllers\RekeningController@show');
Route::post('/edit-rekening', 'App\Http\Controllers\RekeningController@update');
Route::post('/transaksi', 'App\Http\Controllers\RekeningController@transaksi');
Route::post('/exportPdfTransaksi/{no_rekening}', 'App\Http\Controllers\RekeningController@exportPdf');
Route::get('/exportExcelTransaksi/{no_rekening}', 'App\Http\Controllers\RekeningController@exportExcel');

// Buka Rekening
Route::get('/buka-rekening/{no_rekening}', 'App\Http\Controllers\RekeningController@getDataRekening');
Route::get('/transaksi', 'App\Http\Controllers\TransaksiController@index');
Route::get('/where-history-transaksi/{no_rekening}', 'App\Http\Controllers\TransaksiController@getWhereTransaksi');
Route::get('/saldo-transfer/{no_rekening}', 'App\Http\Controllers\RekeningController@getSaldoTransfer');
Route::get('/cetak-struk-transaksi/{id_transaksi}', 'App\Http\Controllers\RekeningController@cetakStruk');
// History
Route::post('/change-status/{id_transfer}', 'App\Http\Controllers\TransaksiController@changeStatus');
Route::get('/exportExcelHistory', 'App\Http\Controllers\TransaksiController@exportExcel');
Route::post('/exportPdfHistory', 'App\Http\Controllers\TransaksiController@exportPdf');