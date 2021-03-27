<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pegawai;
use App\Models\Users;

class PegawaiController extends Controller
{
    
	public function index() {
		$pegawai = Pegawai::where('nm_pegawai', '!=', 'Admin')->get();

		if(count($pegawai) > 0) {
			return response()->json(["status" => 200, "success" => true, "data" => $pegawai]);
		} else {
			return response()->json(["status" => "failed", "success" => false, "message" => "Tidak Ada Data Yang Ditemukan"]);
		}

	}

	public function tambah(Request $request) {
		if($request->all() != "") {
			// data users
			$id_users = date('Ymd').random_int(0, 100);
			$username = $request->username;
			$password = $request->password;
			if($request->nm_pegawai == 'Admin') {
				$level = "Administrator";
			} else {
				$level = "Operator";
			}

			// data pegawai
			$nama 	= $request->nm_pegawai;
			$jk		= $request->jk;
			$no_hp	= $request->no_hp;
			$email	= $request->email;
			$alamat = $request->alamat;

			$dataPegawai = [
				'kd_pegawai' => date('Ymd').random_int(0, 100),
				'nm_pegawai' => $nama,
				'jk'		 => $jk,
				'no_hp'		 => $no_hp,
				'email'		 => $email,
				'alamat'	 => $alamat,
				'id_users'	 => $id_users,
				'status'     => 'Aktif',
			];

			$dataUsers = [
				'id_users' 	=> $id_users,
				'username' 	=> $username,
				'password' 	=> password_hash($password, PASSWORD_DEFAULT),
				'level'		=> $level,
			];

			$users = Users::where('username', $username)->first();

			if(is_null($users)) {

				$tambahPegawai  = Pegawai::create($dataPegawai);
				$tambahUsers	= Users::create($dataUsers);
				if(!is_null($tambahPegawai) && !is_null($tambahUsers)) {
					return response()->json(["status" => 200, "success" => true, "message" => "Data Berhasil Ditambahkan"]);
				} else {
					return response()->json(["status"=>"failed", "success" => false, "message" => "Data Gagal Ditambahkan"]);
				}
			} else {
				return response()->json(["status"=>"failed", "success" => false, "message" => "Username Sudah Dipakai"]);
			}
		} else {
			return response()->json(["status" => "failed", "success" => false, "message" => "Data Input Tidak Boleh Kosong"]);
		}
	}

	public function show($kd_pegawai) {
		$where = Pegawai::where("kd_pegawai", $kd_pegawai)->first();

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

	public function changeStatus($kd_pegawai) {
        $pegawai = Pegawai::where("kd_pegawai", $kd_pegawai)->first();
        if(!is_null($pegawai)) {
            if($pegawai->status == "Aktif") {
                $change = Pegawai::where("kd_pegawai", $kd_pegawai)->update(['status'=>'Tidak Aktif']);
            } else {
                $change = Pegawai::where("kd_pegawai", $kd_pegawai)->update(['status'=>'Aktif']);
            }
            if($change == 1) {
                return response()->json(["status"=>200, "success" => true, "message" => "Status Berhasil Diubah"]);
            } else {
                return response()->json(["status" => "failed", "success" => false, "message" => "Status Gagal Diubah"]);
            }
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Data Tidak Ditemukan"]);
        }
    }

	public function hapus($kd_pegawai) {
		$pegawai = Pegawai::where("kd_pegawai", $kd_pegawai)->first();
    	if(!is_null($pegawai)) {
    		$delete = Pegawai::where('kd_pegawai',$kd_pegawai)->delete();
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
