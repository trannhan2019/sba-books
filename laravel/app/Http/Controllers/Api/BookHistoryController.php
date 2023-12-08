<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\BookHistory;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookHistoryController extends Controller
{
    public function store(Request $request)
    {
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
        $book->quantity = $book->quantity - 1;
        $book->save();
    }

    public function getByUser(Request $request)
    {
        $user_id = Auth::user()->id;
        $itemPerPage = $request->query('item_per_page', 5);
        //fill by company book name
        $search = $request->query('search');

        $book_history = BookHistory::query();

        $book_history->where('exchange_user_id', $user_id)->with('book');
        if (!empty($search)) {
            $book_history = $book_history->where('book.title', 'like', '%' . $search . '%');
        }

        return response()->json($book_history->orderBy('created_at', 'DESC')->paginate($itemPerPage));
        // return response()->json(CategoryBook::all());
    }

    public function update($id)
    {
        $book_history = BookHistory::findOrFail($id);
        $book_history->returned_at = Carbon::now();
        $book_history->save();

        $book = Book::findOrFail($book_history->book_id);
        $book->quantity = $book->quantity + 1;
        $book->save();
    }
}
