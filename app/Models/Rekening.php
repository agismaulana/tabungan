<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rekening extends Model
{
    use HasFactory;

    protected $table = 'rekening';
    public $timestamps = false;
    protected $fillable = ['no_rekening', 'pin', 'kd_nasabah'];

    public function Nasabah() {
    	return $this->belongsToMany(Nasabah::class);
    }

    public function Transfer() {
        return $this->belongsToMany(Transfer::class);
    }

    public function Transaksi() {
    	return $this->hasMany(Transaksi::class);
    }
}
