<?php

namespace App\Http\Controllers;

require_once base_path('vendor/autoload.php');

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
                                 ((saldo_setor) - (saldo_tarik + saldo_transfer)) as saldo'))
                    ->where('rekening.no_rekening', $no_rekening)
                    ->leftJoin(
                        DB::raw("(select 
                                  sum(if(jenis_transaksi='setor', nominal, 0)) as saldo_setor, 
                                  sum(if(jenis_transaksi='tarik', nominal, 0)) as saldo_tarik, 
                                  sum(if(jenis_transaksi='transfer', nominal, 0)) as saldo_transfer, 
                                  transaksi.no_rekening as transaksi_rekening 
                                  from transaksi 
                                  left join transfer on transfer.id_transaksi = transaksi.id_transaksi 
                                  where transaksi.no_rekening = ".$no_rekening.") b")
                        ,'b.transaksi_rekening','=','rekening.no_rekening')
                    ->leftJoin("nasabah", "nasabah.kd_nasabah", "=", "rekening.kd_nasabah")
                    ->first();
        return response()->json(['status'=>200, 'success'=>true, 'data' => $rekening]);
    }

    public function getSaldoTransfer($no_rekening) {
        $saldoTransfer = Rekening::select(DB::raw('saldo_transfer'))
                         ->where('rekening.no_rekening', $no_rekening)
                         ->leftJoin(
                            DB::raw("(select transfer.no_rekening,
                                        sum(if(transfer.no_rekening = ".$no_rekening.", nominal, 0)) as saldo_transfer 
                                      from transfer 
                                      left join transaksi 
                                      on transaksi.id_transaksi = transfer.id_transaksi
                                      where transfer.no_rekening = ".$no_rekening.")
                                    b")
                            ,'b.no_rekening', '=', 'rekening.no_rekening')
                         ->first();
        return response()->json(['status' => 200, 'success' => true, 'data' => $saldoTransfer]);
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
    		$jenisPembayaran= $request->jenis_pembayaran;
    		if($jenisPembayaran == "Non Pembayaran") {
                $kirimTabungan = $request->kirim_tabungan;
            } else {
                $lembaga = Rekening::join('nasabah', 
                                          'nasabah.kd_nasabah', '=', 'rekening.kd_nasabah')
                           ->join('users', 'users.id_users', '=', 'nasabah.id_users')
                           ->where('users.username', 'smkypc')
                           ->first();

                $kirimTabungan = $lembaga->no_rekening;
            }

    		$keterangan		= $request->keterangan;
            $level          = $request->level;
            $pin            = $request->pin;

            $rekeningSaya = Rekening::join('nasabah', 
                                           'nasabah.kd_nasabah', '=', 'rekening.kd_nasabah')
                            ->first();
            if($rekeningSaya->status == "Aktif") {
                if($level == "Nasabah") {
                    $rekening = Rekening::where('no_rekening', $noRekening)->first();
                
                    if(password_verify($pin, $rekening['pin'])) {
                        $dataTransaksi = [
                            'id_transaksi'      => $idTransaksi,
                            'waktu'             => $waktu,
                            'nominal'           => $nominal,
                            'jenis_transaksi'   => $jenisTransaksi,
                            'no_rekening'       => $noRekening,
                        ];

                        if($jenisTransaksi == "Transfer") {
                            $dataTransfer = [
                                'id_transfer'       => date('YmdHis').random_int(0, 100),
                                'jenis_pembayaran'  => $jenisPembayaran,
                                'keterangan'        => $keterangan,
                                'id_transaksi'      => $idTransaksi,
                                'no_rekening'       => $kirimTabungan,
                                'status'            => 'berhasil',
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
                        return response()->json(['status' => 'failed', 'success' => false, 'message' => 'Pin Salah']);
                    }
                } else {
                    $dataTransaksi = [
                        'id_transaksi'      => $idTransaksi,
                        'waktu'             => $waktu,
                        'nominal'           => $nominal,
                        'jenis_transaksi'   => $jenisTransaksi,
                        'no_rekening'       => $noRekening,
                    ];

                    if($jenisTransaksi == "Transfer") {
                        $dataTransfer = [
                            'id_transfer'       => date('YmdHis').random_int(0, 100),
                            'jenis_pembayaran'  => $jenisPembayaran,
                            'keterangan'        => $keterangan,
                            'id_transaksi'      => $idTransaksi,
                            'no_rekening'       => $kirimTabungan,
                            'status'            => 'berhasil',
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
                }
            } else {
                return response()->json(['status'=>'failed', 'success'=>false,'message'=>'Rekening Sudah Tidak Aktif']);
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

    public function exportPdf($no_rekening, Request $request) {

        $mpdf = new \Mpdf\Mpdf();

        $mulai_tanggal = $request->mulai_tanggal;
        $sampai_tanggal = $request->sampai_tanggal;

        $transaksi = Transaksi::where('transaksi.no_rekening', $no_rekening)
                     ->whereBetween('transaksi.waktu', [$mulai_tanggal, $sampai_tanggal])
                     ->orderby('waktu', 'DESC')
                     ->get();
                     
        $saldoTambah = Transaksi::select(
                             DB::raw("(sum(if(jenis_transaksi = 'Setor', nominal, 0)) 
                                      + sum(if(transfer.no_rekening = ".$no_rekening." && status = 'berhasil', nominal, 0))) as saldo_tambah")
                            )
                            ->leftJoin('transfer', 
                                    'transfer.id_transaksi', 
                                    '=', 
                                    'transaksi.id_transaksi')
                            ->where('transaksi.no_rekening', $no_rekening)
                            ->whereBetween('transaksi.waktu', [$mulai_tanggal, $sampai_tanggal])
                            ->first();

        $saldoKurang = Transaksi::select(
                            DB::raw("
                                        (sum(if(jenis_transaksi = 'Tarik', nominal, 0)) + 
                                         sum(if(jenis_transaksi = 'Transfer' && status = 'berhasil', nominal, 0))
                                        ) as saldo_kurang
                                   ")
                            )
                            ->leftJoin('transfer', 
                                    'transfer.id_transaksi', 
                                    '=', 
                                    'transaksi.id_transaksi')
                            ->where('transaksi.no_rekening', $no_rekening)
                            ->whereBetween('transaksi.waktu', [$mulai_tanggal, $sampai_tanggal])
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

        $nasabah = Rekening::where('rekening.no_rekening', $no_rekening)
                   ->join('nasabah', 'nasabah.kd_nasabah', '=', 'rekening.kd_nasabah')
                   ->first();

        $html = "<div>
                    <center>
                        <p align='center'>My Deposits</p>
                        <h1 align='center'>Laporan Transaksi</h1>
                    </center>
                    <h4>No Rekening : ".$no_rekening."</h4>
                    <h4>Nama Nasabah : ".$nasabah->nm_nasabah."</h4>
                    <h4>Tanggal : ".$mulai_tanggal." - ".$sampai_tanggal."</h4>
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
        $file = $mpdf->output();
        return response()
               ->download($file);
    }

    public function cetakStruk($id_transaksi) {
        $transaksi = Transaksi::select(DB::raw('*, transaksi.no_rekening as transaksi_rekening, transaksi.id_transaksi as transaksi_id, transfer.no_rekening as transfer_rekening'))
                     ->where('transaksi.id_transaksi', $id_transaksi)
                     ->leftJoin('transfer', 'transaksi.id_transaksi', '=', 'transfer.id_transaksi')
                     ->leftJoin('rekening', 'transaksi.no_rekening', '=', 'rekening.no_rekening')
                     ->leftJoin('nasabah', 'nasabah.kd_nasabah', '=', 'rekening.kd_nasabah')
                     ->first();

        $mpdf = new \Mpdf\Mpdf();

        $titleJenis = "";
        $jenisPembayaran = "";
        if($transaksi->jenis_transaksi == "transfer") {
            $titleJenis      = "<td>Jenis Pembayaran</td>
                                 <td>Transfer No Rekening</td>";
            $jenisPembayaran = "<td>".$transaksi->jenis_pembayaran."</td>
                                 <td>".$transaksi->transfer_rekening."</td>";
            $total = "<td colspan='4'>Total Transaksi</td>
                      <td>".$transaksi->nominal."</td>";
        } else {
            $total = "<td colspan='2'>Total Transaksi</td>
                      <td>".$transaksi->nominal."</td>";
        }

        $html = "<div>
                    <center>
                        <p align='center'>My Deposits</p>
                        <h1 align='center'>Struk Transaksi</h1>
                    </center>
                    <pre>
                    <h3>Id Transaksi : ".$transaksi->transaksi_id."</h3>
                    <h3>Nama Nasabah : ".$transaksi->nm_nasabah."</h3>
                    <h3>Tanggal      : ".date('d-m-Y')."</h3>
                    </pre>
                    <table border='1' cellspacing='0' cellpadding='5' style='width:100%;'>
                        <tr>
                            <td>Waktu Transaksi</td>
                            <td>Jenis Transaksi</td>
                            ".$titleJenis."
                            <td>Nominal</td>
                        </tr>
                        <tr>
                            <td>".$transaksi->waktu."</td>
                            <td>".$transaksi->jenis_transaksi."</td>
                            ".$jenisPembayaran."
                            <td>".$transaksi->nominal."</td>
                        </tr>
                        <tr>
                            ".$total."
                        </tr>
                    </table>
                </div>";
        $mpdf->writeHTML($html);
        $mpdf->output();
    }
}
