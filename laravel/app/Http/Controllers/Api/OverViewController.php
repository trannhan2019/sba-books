<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\BookHistory;
use App\Models\CategoryBook;
use App\Models\User;
use Illuminate\Http\Request;

class OverViewController extends Controller
{
    public function getOverviewData(){
        $cateBookCount = CategoryBook::count();
        $bookCount = Book::count();
        $bookHistoryCount = BookHistory::count();

        $bookTopTransaction = Book::orderBy('count_transaction','desc')->take(5)->get();
        $userTopTransaction = User::orderBy('count_transaction','desc')->take(5)->get();

        return response()->json(['cateBookCount'=>$cateBookCount,'bookCount'=>$bookCount,'bookHistoryCount'=>$bookHistoryCount,'bookTopTransaction'=>$bookTopTransaction,'userTopTransaction'=>$userTopTransaction],200);
    }
}
