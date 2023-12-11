<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\BookHistory;
use App\Models\User;
use App\Notifications\BookNotification;
use App\Notifications\TestPusherNotification;
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

        $receiver = User::where('username','sba_manager')->first();

        $user->notify(new BookNotification($receiver,$user,$book,$book_history));

        return response()->json('done');
    }

    public function getByUser(Request $request)
    {
        $user_id = Auth::user()->id;
        $itemPerPage = $request->query('itemPerPage', 5);
        //fill by company book name
        $search = $request->query('search');

        $book_history = BookHistory::query();
        $book_history->where('exchange_user_id', $user_id)->with('book');
        if (!empty($search)) {
            $book_history->whereRelation('book','title','like','%'.$search.'%');
        }

        return response()->json($book_history->orderBy('created_at', 'DESC')->paginate($itemPerPage));
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

    public function getList(Request $request)
    {
        $itemPerPage = $request->query('itemPerPage', 5);
        //fill by company book name
        $search = $request->query('search');

        $book_history = BookHistory::query();
        $book_history->with(['book','user']);
        if (!empty($search)) {
            $book_history->whereRelation('user','name','like','%'.$search.'%');
        }

        return response()->json($book_history->orderBy('created_at', 'DESC')->paginate($itemPerPage));
    }

    public function destroy($id)
    {
        $book_history = BookHistory::findOrFail($id);

        $book = Book::findOrFail($book_history->book_id);
        $book->count_transaction = $book->count_transaction - 1;
        if(empty($book_history->returned_at)){
            $book->quantity = $book->quantity + 1;
        }
        $book->save();

        $user = User::findOrFail($book_history->exchange_user_id);
        $user->count_transaction = $user->count_transaction - 1;
        $user->save();

        $book_history->delete();
        return response()->json('Book History deleted', 201);
    }

    public function test(Request $request){
        $user = Auth::user();
        $msg = 'Tesfsadfsadf';
        $user->notify(new TestPusherNotification($user->id,$msg));
        return 'done';
    }
}
