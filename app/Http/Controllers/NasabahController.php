<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Nasabah;

class NasabahController extends Controller
{
    public function index(){
    	$nasabah = Nasabah::all();

    	if(count($nasabah) > 0) {
	    	return response()->json(["status" => 200, "success" => true, "data"=> $nasabah]);
    	} else {
    		return response()->json(["status" => "failed", "success" => false, "message"=>"Tidak Ada Data Yang Ditemukan"]);
    	}
    }

    public function show($kd_nasabah) {
    	$where = Nasabah::where("kd_nasabah", $kd_nasabah)->get();
    
    	return response()->json(["status"=>200, "success"=>true, "data" => $where]);
    }

    public function tambah(Request $request) {

    	if($request->all() != null) {
	    	$nama 	= $request->nm_nasabah;
	    	$jk	  	= $request->jk;
	    	$no_hp	= $request->no_hp;
	    	$email	= $request->email;
	    	$alamat = $request->alamat;

	    	$data = [
	    		'kd_nasabah' => (int)date('Ymd').random_int(0,100),
	    		'nm_nasabah' => $nama,
	    		'jk'		 => $jk,
	    		'no_hp'		 => $no_hp,
	    		'email'		 => $email,
	    		'alamat'	 => $alamat,
	    		'id_users'	 => 0,
	    	];

	    	$tambah = Nasabah::create($data);
	    	if(!is_null($tambah)) {
		    	return response()->json(["status"=>200, "success" => true, "message"=>"Data Berhasil Ditambahkan"]);
	    	} else {
	    		return response()->json(["status"=>"failed", "success" => false,"message"=>"Data Gagal Ditambahkan"]);
	    	}
    	} else {
    		return response()->json(["status"=>"failed", "success"=>false,"message"=>"Data Tidak Boleh Ada Yang Kosong"]);
    	}
    }

    public function update(Request $request) {
    	$kd 	= $request->kd_nasabah;
    	$nama 	= $request->nm_nasabah;
    	$jk	  	= $request->jk;
    	$no_hp	= $request->no_hp;
    	$email	= $request->email;
    	$alamat = $request->alamat;

    	$data = [
    		'nm_nasabah' => $nama,
    		'jk'		 => $jk,
    		'no_hp'		 => $no_hp,
    		'email'		 => $email,
    		'alamat'	 => $alamat,
    	];

    	$update = Nasabah::where('kd_nasabah', $kd)->update($data);
    	if(!is_null($update)) {
    		return response()->json(["status"=>200, "success"=>true, "message"=>"Data Berhasil Diupdate"]);
    	} else {
    		return response()->json(["status"=>"failed", "success"=>false, "message"=>"Data Gagal Diupdate"]);
    	}
    }

    public function hapus($kd_nasabah) {
    	$nasabah = Nasabah::where("kd_nasabah", $kd_nasabah)->get();
    	if(!is_null($nasabah)) {
    		$delete = Nasabah::where("kd_nasabah", $kd_nasabah)->delete();
    		if($delete == 1) {
    			return response()->json(["status"=>200, "success" => true, "message" => "Data Berhasil Dihapus"]);
    		} else {
    			return response()->json(["status" => "failed", "success" => false, "message" => "Data Gagal Dihapus"]);
    		}
    	} else {
    		return response()->json(["status" => "failed", "success" => false, "message" => "Data Tidak Ditemukan"]);
    	}
    }
}
