<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\BookHistory;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BookHistoryController extends Controller
{
    public function store(Request $request){
        $user_id = $request->exchange_user_id;
        $book_id = $request->book_id;

        $book = Book::findOrFail($book_id);
        $user = User::findOrFail($user_id);

        $book_history = new BookHistory();
        $book_history->exchange_user_id = $user_id;
        $book_history->book_id = $book_id;
        $book_history->exchanged_at = Carbon::now();
        $book_history->save();

        $user->count_transaction = $user->count_transaction + 1;
        $user->save();

        $book->count_transaction = $book->count_transaction + 1;
        $book->save();
    }
}
