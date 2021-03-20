<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

// Models
use App\Models\Nasabah;
use App\Models\Pegawai;
use App\Models\Transaksi;
use App\Models\Transfer;


class HomeController extends Controller
{
    public function getCount() {
    	$jumlahNasabah 		= Nasabah::all()->count();
    	$jumlahPegawai 		= Pegawai::all()->count();
    	$jumlahTransaksi	= Transaksi::all()->count();
    	$saldoTransaksi 	= Transaksi::select(
    							          DB::raw(
                              "(sum(if(jenis_transaksi != 'Tarik', nominal, 0)) - sum(if(jenis_transaksi = 'Tarik', nominal, 0))) as saldo"
                            )
                          )
    					    	      ->first();

  		$data = [
  			'jumlahNasabah' 	=> $jumlahNasabah,
  			'jumlahPegawai' 	=> $jumlahPegawai,
  			'jumlahTransaksi'	=> $jumlahTransaksi,
  			'saldoTransaksi' 	=> $saldoTransaksi->saldo
  		];

    	return response()->json(['status' => 200, 'success' => true, 'data' => $data]);
    }
}
