<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use App\Models\Nasabah;
use App\Models\Pegawai;

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

    public function updateProfile(Request $request) {
        if($request->all() != "") {
            $kd_users = $request->kd_users;
            $nm_users = $request->nm_users;
            $email = $request->email;
            $jk = $request->jk;
            $no_hp = $request->no_hp;
            $alamat = $request->alamat;
            $level = $request->level;

            if($level == 'Nasabah') {
                $data = [
                    'nm_nasabah' => $nm_users,
                    'jk'         => $jk,
                    'no_hp'      => $no_hp,
                    'email'      => $email,
                    'alamat'     => $alamat,
                ];

                $update = Nasabah::where('kd_nasabah', $kd_users)->update($data);
            } else {
                $data = [
                    'nm_pegawai' => $nm_users,
                    'jk'         => $jk,
                    'no_hp'      => $no_hp,
                    'email'      => $email,
                    'alamat'     => $alamat,
                ];

                $update = Pegawai::where('kd_pegawai', $kd_users)->update($data);
            }

            if(!is_null($update)) {
                return response()->json(['status' => 200, 'success' => true, 'message' => 'Data Berhasil Diubah']);
            } else {
                return response()->json(['status'=>'failed', 'success' => false, 'message' => 'Data Gagal Diubah']);
            }
        } else {
            return response()->json([
                'status' => 'failed',
                'success' => false,
                'message' => 'Data Tidak Ditemukan'
            ]);
        }
    }

    public function ubahPassword(Request $request) {
        if($request->all() != ""){
            $id_users = $request->id_users;
            $username = $request->username;
            $passwordLama = $request->password_lama;
            $passwordBaru = $request->password_baru;

            $user = Users::where('id_users', $id_users)->first();

            if(password_verify($passwordLama, $user->password)) {
                $data = [
                    'username' => $username,
                    'password' => password_hash($passwordBaru, PASSWORD_DEFAULT),
                ];

                $update = Users::where('id_users', $id_users)->update($data);

                if(!is_null($update)) {
                    return response()->json(['status'=>200,'success'=>true,'message'=>'User Berhasil Diubah']);
                } else {
                    return response()->json(['status'=>'failed','success'=>false,'message'=>'User gagal Diubah']);
                }
            } else {
                return response()->json(['status'=>'failed','success'=>false,'message'=>'Password Salah']);
            }
        } else {
            return response()->json(['status'=>'failed', 'success' => false, 'message' => 'Data Tidak Ditemukan']);
        }
    }
}
