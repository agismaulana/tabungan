<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use App\Models\Nasabah;

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
    		if(password_verify($password, $user->password)) {
		    	return response()->json(['status'=> $this->status,"success" => true,'user' => $user]);
    		} else {
	    		return response()->json(['status' => "failed", "success" => false, "message" => "Password Salah"]);	
    		}
    	} else {
    		return response()->json(['status' => "failed", "success" => false, "message" => "Akun Tidak Terdaftar"]);
    	}

    }
}
