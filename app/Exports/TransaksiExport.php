<?php

namespace App\Exports;

use App\Models\Transaksi;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;

class TransaksiExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */

    private $no_rekening;

    public function __construct($no_rekening) {
    	$this->no_rekening = $no_rekening;
    }

    public function collection()
    {
        $transaksi = Transaksi::select(DB::RAW("transaksi.id_transaksi,rekening.no_rekening, 
        								nasabah.nm_nasabah, transaksi.nominal,
        								transaksi.jenis_transaksi, 
        								DATE_FORMAT(transaksi.waktu, '%W, 
        								%d %M %Y %H:%i:%s')"))
        			 ->join('rekening', 'rekening.no_rekening', '=', 'transaksi.no_rekening')
        			 ->join('nasabah', 'nasabah.kd_nasabah', '=', 'rekening.kd_nasabah')
        			 ->where('transaksi.no_rekening', $this->no_rekening)
        			 ->get();
    	return $transaksi;
    }
}
