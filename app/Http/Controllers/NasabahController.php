<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Nasabah;
use App\Models\Users;
use App\Models\Rekening;

class NasabahController extends Controller
{
    public function index(){
    	$nasabah = DB::select('call NASABAH()');

    	if(count($nasabah) > 0) {
	    	return response()->json(["status" => 200, "success" => true, "data"=> $nasabah]);
    	} else {
    		return response()->json(["status" => "failed", "success" => false, "message"=>"Tidak Ada Data Yang Ditemukan"]);
    	}
    }

    public function show($kd_nasabah) {
    	$where = Nasabah::where("kd_nasabah", $kd_nasabah)->first();
    
    	return response()->json(["status"=>200, "success"=>true, "data" => $where]);
    }

    public function tambah(Request $request) {

    	if($request->all() != null) {
	    	// data users
            $id_users = date('Ymd').random_int(0, 100);
            $username = $request->username;
            $password = $request->password;

            // data Nasabah
            $kd_nasabah  = (int)date('Ymd').random_int(0,100);
            $nama 	     = $request->nm_nasabah;
	    	$jk	  	     = $request->jk;
	    	$no_hp	     = $request->no_hp;
	    	$email	     = $request->email;
	    	$alamat      = $request->alamat;

            // data Rekening 
            $pin = $request->pin;

	    	$dataNasabah = [
	    		'kd_nasabah' => $kd_nasabah,
	    		'nm_nasabah' => $nama,
	    		'jk'		 => $jk,
	    		'no_hp'		 => $no_hp,
	    		'email'		 => $email,
	    		'alamat'	 => $alamat,
	    		'id_users'	 => $id_users,
                'status'     => 'Aktif',
	    	];

            $dataUsers = [
                'id_users'   => $id_users,
                'username'   => $username,
                'password'   => password_hash($password, PASSWORD_DEFAULT),
                'level'      => 'Nasabah',
            ];

            $dataRekening = [
                'no_rekening' => (string)date('Ymd').rand(),
                'pin'         => password_hash($pin, PASSWORD_DEFAULT),
                'kd_nasabah'  => $kd_nasabah,
            ];

	    	$tambahNasabah  = Nasabah::create($dataNasabah);
            $tambahUsers    = Users::create($dataUsers);
	    	if(!is_null($tambahNasabah) && !is_null($tambahUsers)) {
                $tambahRekening = Rekening::create($dataRekening);
                if(!is_null($tambahRekening)){
    		    	return response()->json(["status"=>200, "success" => true, "message"=>"Data Berhasil Ditambahkan"]);
                }
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
    	$nasabah = Nasabah::where("kd_nasabah", $kd_nasabah)->first();
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

    public function changeStatus($kd_nasabah) {
        $nasabah = Nasabah::where("kd_nasabah", $kd_nasabah)->first();
        if(!is_null($nasabah)) {
            if($nasabah->status == "Aktif") {
                $change = Nasabah::where("kd_nasabah", $kd_nasabah)->update(['status'=>'Tidak Aktif']);
            } else {
                $change = Nasabah::where("kd_nasabah", $kd_nasabah)->update(['status'=>'Aktif']);
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
}
