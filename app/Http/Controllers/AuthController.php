<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use App\Models\Nasabah;
use App\Models\Pegawai;

class AuthController extends Controller
{
	private $status = 200;

    public function login(Request $request) {
    	$username = $request->username;
    	$password = $request->password;

    	$user = Users::where('username', $username)
    			->first();
    	$count = Users::where('username', $username)->count();

    	if($count > 0) {
            if($user->level != "Nasabah") {
                $users = Pegawai::where('id_users', $user->id_users)->first();
            } else {
                $users = Nasabah::where('id_users', $user->id_users)->first();
            }

    		if(password_verify($password, $user->password)) {
                if($users->status == "Aktif") {
    		    	return response()->json(['status'=> $this->status,"success" => true,'user' => $user]);
                } else {
    	    		return response()->json(['status' => "failed", "success" => false, "message" => "Akun Tidak Aktif"]);
                }
    		} else {
                return response()->json(['status' => "failed", "success" => false, "message" => "Password Salah"]);	
    		}
    	} else {
    		return response()->json(['status' => "failed", "success" => false, "message" => "Akun Tidak Terdaftar"]);
    	}

    }
}
