<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pegawai;

class PegawaiController extends Controller
{
    
	public function index() {
		$pegawai = Pegawai::all();

		if(count($pegawai) > 0) {
			return response()->json(["status" => 200, "success" => true, "data" => $pegawai]);
		} else {
			return response()->json(["status" => "failed", "success" => false, "message" => "Tidak Ada Data Yang Ditemukan"]);
		}

	}

	public function tambah(Request $request) {
		if($request->all() != "") {
			$nama 	= $request->nm_pegawai;
			$jk		= $request->jk;
			$no_hp	= $request->no_hp;
			$email	= $request->email;
			$alamat = $request->alamat;

			$data = [
				'kd_pegawai' => date('Ymd').random_int(0, 100),
				'nm_pegawai' => $nama,
				'jk'		 => $jk,
				'no_hp'		 => $no_hp,
				'email'		 => $email,
				'alamat'	 => $alamat,
				'id_users'	 => 0,
			];

			$tambah = Pegawai::create($data);
			if(!is_null($tambah)) {
				return response()->json(["status" => 200, "success" => true, "message" => "Data Berhasil Ditambahkan"]);
			} else {
				return response()->json(["status"=>"failed", "success" => false, "message" => "Data Gagal Ditambahkan"]);
			}
		} else {
			return response()->json(["status" => "failed", "success" => false, "message" => "Data Input Tidak Boleh Kosong"]);
		}
	}

	public function show($kd_pegawai) {
		$where = Pegawai::where("kd_pegawai", $kd_pegawai)->get();

		return response()->json(["status"=>200, "success"=>true, "data" => $where]);
	}

	public function update(Request $request) {
		$kd = $request->kd_pegawai;
		$nama = $request->nm_pegawai;
		$jk = $request->jk;
		$no_hp = $request->no_hp;
		$email = $request->email;
		$alamat = $request->alamat;

		$data = [
			"nm_pegawai" => $nama,
			"jk"		 => $jk,
			"no_hp"		 => $no_hp,
			"email"		 => $email,
			"alamat"	 => $alamat,
		];

		$update = Pegawai::where("kd_pegawai",$kd)->update($data);

		if(!is_null($update)) {
			return response()->json(["status" => 200, "success" => true, "message" => "Data Berhasil Diupdate"]);
		} else {
			return response()->json(["status" => "failed", "success" => false, "message" => "Data Gagal Diupdate"]);
		}
	}

	public function hapus($kd_pegawai) {
		$pegawai = Pegawai::where("kd_pegawai", $kd_pegawai)->get();
    	if(!is_null($pegawai)) {
    		$delete = Pegawai::where("kd_pegawai", $kd_pegawai)->delete();
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
