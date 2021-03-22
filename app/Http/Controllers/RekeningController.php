<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

use App\Exports\TransaksiExport;

use App\Models\Rekening;
use App\Models\Transaksi;
use App\Models\Transfer;

class RekeningController extends Controller
{
    public function index() {
    	$rekening = Rekening::join('nasabah', 'rekening.kd_nasabah', '=', 'nasabah.kd_nasabah')->get();

    	if(count($rekening) > 0){
    		return response()->json(['status'=>200,'success'=>true,'data'=>$rekening]);
    	} else {
    		return response()->json(['status'=>"failed", 'success'=>false, 'message' => 'Data Tidak Ditemukan']);
    	}
    }

    public function show($no_rekening) {
    	$rekening = Rekening::join('nasabah', 'rekening.kd_nasabah', '=', 'nasabah.kd_nasabah')
    				->where('no_rekening', $no_rekening)->first();

    	return response()->json(['status' => 200, 'success' => true, 'data'=>$rekening]);
    }

    public function getDataRekening($no_rekening) {
        $rekening = Rekening::select(
                        DB::raw('*,
                                 ((saldo_setor + saldo_transfer_tabungan) - (saldo_tarik + saldo_transfer)) as saldo'))
                    ->where('rekening.no_rekening', $no_rekening)
                    ->leftJoin(
                        DB::raw("(select 
                                  sum(if(jenis_transaksi='setor', nominal, 0)) as saldo_setor, 
                                  sum(if(jenis_transaksi='tarik', nominal, 0)) as saldo_tarik, 
                                  sum(if(jenis_transaksi='transfer' && jenis_pembayaran='tabungan' && status='berhasil', nominal, 0)) as saldo_transfer,
                                  sum(if(transfer.no_rekening = ".$no_rekening." && transfer.status = 'berhasil', nominal, 0)) as saldo_transfer_tabungan, 
                                  transaksi.no_rekening as transaksi_rekening 
                                  from transaksi 
                                  left join transfer on transfer.id_transaksi = transaksi.id_transaksi 
                                  where transaksi.no_rekening = ".$no_rekening.") b")
                        ,'b.transaksi_rekening','=','rekening.no_rekening')
                    ->leftJoin("nasabah", "nasabah.kd_nasabah", "=", "rekening.kd_nasabah")
                    ->first();
        return response()->json(['status'=>200, 'success'=>true, 'data' => $rekening]);
    }

    public function transaksi(Request $request) {
    	if($request->all() != "") {
    		// data Transaksi
    		$idTransaksi 	= date('YmdHis').random_int(0,100);
    		$waktu			= now();
    		$nominal		= $request->nominal;
    		$jenisTransaksi = $request->jenis_transaksi;
    		// data Rekening
    		$noRekening 	= $request->no_rekening;
    		// data Transfer
    		$kirimTabungan	= $request->kirim_tabungan;
    		$jenisPembayaran= $request->jenis_pembayaran;
    		$keterangan		= $request->keterangan;

			$dataTransaksi = [
				'id_transaksi' 		=> $idTransaksi,
				'waktu'		   		=> $waktu,
				'nominal'	   		=> $nominal,
				'jenis_transaksi'	=> $jenisTransaksi,
				'no_rekening'		=> $noRekening,
			];

    		if($jenisTransaksi == "Transfer") {
    			$dataTransfer = [
    				'id_transfer' 		=> date('YmdHis').random_int(0, 100),
    				'jenis_pembayaran'  => $jenisPembayaran,
    				'keterangan'		=> $keterangan,
    				'id_transaksi'		=> $idTransaksi,
    				'no_rekening'		=> $kirimTabungan,
    				'status'			=> 'menunggu konfirmasi',
    			];

    			$createTransfer = Transfer::create($dataTransfer);
    			if(!is_null($createTransfer)) {
	    			$create = Transaksi::create($dataTransaksi);
	    			return response()->json(['status' => 200, 'success' => true, 'message' => "Transfer Berhasil"]);
    			} else {
    				return response()->json(['status' => "failed", 'success' => false, 'message' => "Transfer Gagal"]);
    			}
    		} else {
    			$create = Transaksi::create($dataTransaksi);
    			if(!is_null($create)) {
    				return response()->json(['status' => 200, 'success' => true, 'message' => "Transaksi Berhasil"]);
    			} else {
    				return response()->json(['status'=>"failed", 'success' => false, 'message' => "Transaksi Gagal"]);
    			}
    		}
    	} else {
    		return response()->json(['status'=>"failed", 'success'=>false, 'message'=>'Data Tidak Boleh Kosong']);
    	}
    }

    public function update(Request $request) {
    	if($request->all() != "") {
    		$noRekening = $request->no_rekening;
    		$pinLama = $request->pin_lama;
    		$pinBaru = $request->pin_baru;

    		$where = Rekening::where('no_rekening', $noRekening)->first();
    		if(password_verify($pinLama, $where->pin)) {
    			$update = Rekening::where('no_rekening', $noRekening)->update(['pin' => password_hash($pinBaru, PASSWORD_DEFAULT)]);
    			if(!is_null($update)) {
    				return response()->json(['status' => 200, 'success' => true, 'message' => 'Update Berhasil']);
    			} else {
    				return response()->json(['status' => "failed", 'success' => false, 'message' => "Update Gagal"]);
    			}
    		} else {
    			return response()->json(['status' => "failed", 'success'=>false, 'message'=>"Pin Salah"]);
    		}
    	} else {
    		return response()->json(['status'=>"failed", 'success'=>false, 'message'=>"Data Tidak Boleh Kosong"]);
    	}
    }

    public function exportExcel($no_rekening) {

        $transaksi = new TransaksiExport($no_rekening);

        $download = Excel::download(
                $transaksi, 
                'transaksi-'.$no_rekening.'.xlsx');
        if($download) {
            return $download;
            return response()->json(['status' => 200, 'success'=>true, 'message' => 'Export Excel Berhasil']);
        } else {
            return response()->json(['status' => 200, 'success'=>true, 'message' => 'Export Excel Gagal']); 
        }
    }

    public function exportPdf($no_rekening) {
        require_once base_path('vendor/autoload.php');

        $mpdf = new \Mpdf\Mpdf();

        $transaksi = Transaksi::where('no_rekening', $no_rekening)->get();
        $saldoTambah = Transaksi::select(
                             DB::raw("(sum(if(jenis_transaksi = 'Setor', nominal, 0)) 
                                      + sum(if(transfer.no_rekening = ".$no_rekening." && status = 'berhasil', nominal, 0))) as saldo_tambah")
                            )
                            ->leftJoin('transfer', 
                                    'transfer.id_transaksi', 
                                    '=', 
                                    'transaksi.id_transaksi')
                            ->where('transaksi.no_rekening', $no_rekening)
                            ->first();

        $saldoKurang = Transaksi::select(
                            DB::raw("
                                        (sum(if(jenis_transaksi = 'Tarik', nominal, 0)) + 
                                         sum(if(jenis_transaksi = 'Transfer' && jenis_pembayaran = 'Tabungan' && status = 'Berhasil', nominal, 0))
                                        ) as saldo_kurang
                                   ")
                            )
                            ->leftJoin('transfer', 
                                    'transfer.id_transaksi', 
                                    '=', 
                                    'transaksi.id_transaksi')
                            ->where('transaksi.no_rekening', $no_rekening)
                            ->first();
        
        $recordtransaksi = "";
        foreach($transaksi as $trans) {
            $recordtransaksi .= "<tr>
                                    <td>".$trans->id_transaksi."</td>
                                    <td>".$trans->waktu."</td>
                                    <td>".$trans->jenis_transaksi."</td>
                                    <td>Rp.".$trans->nominal."</td>
                                </tr>";
        }

        $html = "<div>
                    <center>
                        <h1 align='center'>Laporan Transaksi</h1>
                        <h4 align='center'>No Rekening</h4>
                        <h3 align='center'>".$no_rekening."<h3>
                    </center>
                    <table border='1' cellspacing='0' cellpadding='5' style='width:100%;'>
                        <tr>
                            <td>Id Transaksi</td>
                            <td>Waktu Transaksi</td>
                            <td>Jenis Transaksi</td>
                            <td>Nominal</td>
                        </tr>
                        ".$recordtransaksi."
                        <tr>
                            <td colspan='3'>Saldo Tabungan</td>
                            <td>Rp.".$saldoTambah->saldo_tambah - $saldoKurang->saldo_kurang."</td>
                        </tr>
                    </table>
                </div>";

        $mpdf->writeHTML($html);
        $mpdf->output();

    }
}
