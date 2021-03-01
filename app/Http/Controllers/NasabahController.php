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

    public function tambah() {
    	
    }
}
