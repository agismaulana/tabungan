<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfer extends Model
{
    use HasFactory;
    protected $table = 'transfer';
    public $timestamps = false;
    protected $fillable = ["id_transfer", "jenis_pembayaran", "keterangan", "id_transaksi", "no_rekening", "status"];

    public function Transaksi() {
    	return $this->belongsToMany(Transaksi::class, 'id_transaksi');
    }

    public function Rekening() {
    	return $this->hasMany(Rekening::class, 'no_rekening');
    }
}
