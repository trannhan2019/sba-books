<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookHistory extends Model
{
    use HasFactory;

    protected $fillable = ['exchange_user_id', 'book_id', 'verify_user_id', 'is_read',
        'exchanged_at', 'verified_at', 'returned_at'];

    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'exchange_user_id');
    }
}
