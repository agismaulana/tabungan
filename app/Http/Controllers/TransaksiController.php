<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaksi;


class TransaksiController extends Controller
{
    public function index() {
    	$transaksi = Transaksi::leftJoin('transfer', 'transaksi.id_transaksi', '=', 'transfer.id_transaksi')
    				 ->get();
    	return response()->json(["status" => 200, "success"=>true, "data"=>$transaksi]);
    }

    public function getWhereTransaksi($no_rekening) {
		$transaksi = Transaksi::leftJoin('transfer', 'transaksi.id_transaksi', '=', 
										 'transfer.id_transaksi')
					 ->where('transaksi.no_rekening', $no_rekening)
					 ->orderBy('waktu', 'DESC')
    				 ->get();
    	return response()->json(["status" => 200, "success"=>true, "data"=>$transaksi]);

    }
}
