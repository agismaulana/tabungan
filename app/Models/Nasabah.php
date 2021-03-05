<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nasabah extends Model
{
    use HasFactory;
    protected $table = 'nasabah';
    public $timestamps = false;
    protected $fillable = ["kd_nasabah", "nm_nasabah", "jk", "no_hp", "email", "alamat", "id_users"];

    public function Users() {
    	return $this->hasMany(Users::class, 'id_users');
    }

    public function Rekening() {
    	return $this->hasMany(Rekening::class, 'kd_nasabah');
    }
}
