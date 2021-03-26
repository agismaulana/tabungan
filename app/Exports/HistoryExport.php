<?php

namespace App\Exports;

use App\Models\Transaksi;
use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Support\Facades\DB;

class HistoryExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $history = Transaksi::select(DB::raw('transaksi.*, transfer.*'))
                     ->leftJoin('transfer', 'transaksi.id_transaksi', '=', 'transfer.id_transaksi')
    				 ->get();;
        return $history;
    }
}
