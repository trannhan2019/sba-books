<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookHistory extends Model
{
    use HasFactory;

    protected $fillable = ['exchange_user_id','book_id','verify_user_id','exchanged_at','verified_at','returned_at'];
}
