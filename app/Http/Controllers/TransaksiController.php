<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Maatwebsite\Excel\Facades\Excel;

use App\Exports\HistoryExport;

use App\Models\Transaksi;
use App\Models\Transfer;


class TransaksiController extends Controller
{
    public function index() {
    	$transaksi = Transaksi::select(DB::raw('transaksi.*, transaksi.id_transaksi as transaksi_id, transaksi.no_rekening as transaksi_rekening, transfer.*'))
                     ->leftJoin('transfer', 'transaksi.id_transaksi', '=', 'transfer.id_transaksi')
    				 ->get();
    	return response()->json(["status" => 200, "success"=>true, "data"=>$transaksi]);
    }

    public function getWhereTransaksi($no_rekening) {
        $transaksi = Transaksi::select(DB::raw('*,transaksi.id_transaksi as transaksi_id, transaksi.no_rekening as transaksi_rekening, transfer.no_rekening as transfer_rekening'))
                     ->leftJoin('transfer', 'transaksi.id_transaksi', '=', 
										 'transfer.id_transaksi')
					 ->where('transaksi.no_rekening', $no_rekening)
					 ->orderBy('waktu', 'DESC')
    				 ->get();
    	return response()->json(["status" => 200, "success"=>true, "data"=>$transaksi]);
    }

    public function changeStatus($id_transfer) {
        $update = Transfer::where('id_transfer', $id_transfer)->update(['status' => 'berhasil']);
        
        if(!is_null($update)) {
            return response()->json(['status' => 200, 'success' => true, 'message' => 'Konfirmasi Telah Berhasil']);
        } else {
            return response()->json(['status' => 'failed', 'success' => false, 'message' => 'Konfirmasi Telah Gagal']);
        }
    }

    public function exportExcel() {
        $history = new HistoryExport();

        $download = Excel::download(
                $history, 
                'history-transaksi.xlsx');
        if($download) {
            return $download;
            return response()->json(['status' => 200, 'success'=>true, 'message' => 'Export Excel Berhasil']);
        } else {
            return response()->json(['status' => 200, 'success'=>true, 'message' => 'Export Excel Gagal']); 
        }
    }

    public function exportPdf(Request $request) {
        require_once base_path('vendor/autoload.php');

        $mpdf = new \Mpdf\Mpdf();

        $mulai_tanggal = $request->mulai_tanggal;
        $sampai_tanggal = $request->sampai_tanggal;

        $transaksi = Transaksi::select(DB::raw('transaksi.*, transaksi.id_transaksi as transaksi_id, transaksi.no_rekening as transaksi_rekening, transfer.*'))
                     ->leftJoin('transfer', 'transaksi.id_transaksi', '=', 'transfer.id_transaksi')
                     ->whereBetWeen('transaksi.waktu', [$mulai_tanggal, $sampai_tanggal])
                     ->get();
        
        $saldo = Transaksi::select(DB::raw("sum(nominal) as total"))
                 ->leftJoin('transfer', 'transaksi.id_transaksi', '=', 'transfer.id_transaksi')
                 ->whereBetWeen('transaksi.waktu', [$mulai_tanggal, $sampai_tanggal])
                 ->first();

        $recordtransaksi = "";
        foreach($transaksi as $trans) {
            if($trans->no_rekening != null) {
                $jenis_pembayaran = $trans->jenis_pembayaran;
                $trans_rekening = $trans->no_rekening;
            } else {
                $jenis_pembayaran = "-";
                $trans_rekening = "-";
            }
            $recordtransaksi .= "<tr>
                                    <td>".$trans->transaksi_id."</td>
                                    <td>".$trans->transaksi_rekening."</td>
                                    <td>".$trans->waktu."</td>
                                    <td>".$trans->jenis_transaksi."</td>
                                    <td>".$jenis_pembayaran."</td>
                                    <td>".$trans_rekening."</td>
                                    <td>Rp.".number_format($trans->nominal, 0, 2, '.')."</td>
                                </tr>";
        }

        $date = date('D d-m-Y');

        $html = "<div>
                    <center>
                        <h1 align='center'>Laporan History Transaksi</h1>
                    </center>
                    <p>Tanggal : ".$date."</p>

                    <p>
                        Laporan Dari Tanggal 
                        ".date_format(date_create($mulai_tanggal), 'd-m-Y')." 
                        Sampai 
                        ".date_format(date_create($sampai_tanggal), 'd-m-Y')."
                    </p>
                    <table border='1' cellspacing='0' cellpadding='5' style='width:100%;'>
                        <tr>
                            <td>Id Transaksi</td>
                            <td>Transaksi Rekening</td>
                            <td>Waktu Transaksi</td>
                            <td>Jenis Transaksi</td>
                            <td>Jenis Pembayaran</td>
                            <td>Transfer Rekening</td>
                            <td>Nominal</td>
                        </tr>
                        ".$recordtransaksi."
                        <tr>
                            <td colspan='6'>Total Transaksi</td>
                            <td>Rp.".number_format($saldo->total, 0, 2, '.')."</td>
                        </tr>
                    </table>
                </div>";

        $mpdf->writeHTML($html);
        if($transaksi != null) {
            $file = $mpdf->output();
            return response()->download($file);
        } else {
            return response()->json(['status'=>'failed', 'success'=>false,'message'=>'Tidak Ada Ditemukan']);
        }

    }
}
