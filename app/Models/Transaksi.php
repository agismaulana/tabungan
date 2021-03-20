<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;
    protected $table = "transaksi";
    public $timestamps = false;
    protected $fillable = ["id_transaksi", "waktu", "nominal", "jenis_transaksi", "no_rekening"];

    public function Rekening() {
    	return $this->belongsToMany(Rekening::class);
    }

    public function Transfer() {
    	return $this->hasMany(Transfer::class);
    }

    public function collection() {

    }
}

?>