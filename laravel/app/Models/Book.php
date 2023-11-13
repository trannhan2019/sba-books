<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title','description','quantity','author','code','storage_location','more_info','category_book_id','photo'
    ];

    public function cateBook(){
        return $this->belongsTo(CategoryBook::class,'category_book_id','id');
    }
}
