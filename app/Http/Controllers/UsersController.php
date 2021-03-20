<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use App\Models\Nasabah;

class UsersController extends Controller
{
    public function joinNasabah($id_users) {
    	$users = Users::join('nasabah', 'nasabah.id_users', '=', 'users.id_users')
    			 ->join('rekening', 'rekening.kd_nasabah', '=', 'nasabah.kd_nasabah')
    			 ->where('users.id_users', $id_users)
    			 ->first();
    	return response()->json(['status'=>200, 'succes'=>true, 'data'=>$users]);
    }

    public function joinPegawai($id_users) {
        $users = Users::join('pegawai', 'pegawai.id_users', '=', 'users.id_users')
                 ->where('users.id_users', $id_users)
                 ->first();
        return response()->json(['status' => 200, 'success'=>true, 'data' => $users]);
    }

    public function getNoRekening($kd_nasabah) {
    	$nasabah = Nasabah::join('rekening', 'rekening.kd_nasabah', '=', 'nasabah.kd_nasabah')
    			   ->where('nasabah.kd_nasabah', $kd_nasabah)
    			   ->first();
    	return response()->json(['status'=>200, 'succes'=>true, 'data'=>$nasabah]);
    }

    public function index() {
        $users = Users::where('level', '!=', 'Administrator')->get();

        return response()->json(['status'=>200, 'success'=>true, 'data'=>$users]);
    }

    public function show($id_users) {
        $users = Users::where('id_users', $id_users)->first();
    
        return response()->json(['status'=>200, 'success'=>true, 'data'=>$users]);
    }

    public function update(Request $request) {
        if($request->all() != "") {
            $id = $request->id_users;
            $username = $request->username;
            $password = $request->password;
        
            $data = [
                'username' => $username,
                'password' => password_hash($password, PASSWORD_DEFAULT),
            ];

            $update = Users::where('id_users', $id)->update($data);
            if(!is_null($update)) {
                return response()->json(['status' => 200, 'success' => true, 'message' => 'Data Berhasil Diupdate']);
            } else {
                return response()->json(['status' => 'failed', 'success' => false, 'message' => 'Data Gagal Diupdate']);
            }
        } else {
            return response()->json(['status' => 'failed', 'success' => false, 'message' => 'Data Tidak Ada']);
        }
    }
}
