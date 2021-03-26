<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{
    use HasFactory;
    protected $table = "pegawai";
    public $timestamps = false;
    protected $fillable = ["kd_pegawai", "nm_pegawai", "jk", "no_hp", "email", "alamat", "id_users", "status"];

    public function Users() {
    	return $this->hasMany(Users::class);
    }
}
