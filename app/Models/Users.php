<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    use HasFactory;
    protected $table = 'users';
    public $timestamps = false;
    protected $fillable = ['id_users', 'username', 'password', 'level'];

    public function Nasabah() {
    	return $this->belongsToMany(Nasabah::class);
    }

    public function Pegawai() {
    	return $this->belongsToMany(Pegawai::class);
    }
}
