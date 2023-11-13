<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Book\StoreBookRequest;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    public function store(StoreBookRequest $request)
    {
        $book = new Book();
        $book->title = $request->title;
         $book->description = $request->description;
         $book->quantity = $request->quantity;
         $book->author = $request->author;
         $book->code = $request->code;
         $book->storage_location = $request->storage_location;
         $book->more_info = $request->more_info;
         $book->category_book_id = $request->category_book_id;
        //image
        if (!empty($request->photo)) {
            $path = Storage::put('books', $request->photo);
            $book->photo = $path;
        }
         $book->save();
        return response()->json('Created !!', 201);
    }
        public function index(Request $request){
            $itemPerPage = $request->query('item_per_page', 5);
            //fill by company name or alias
            $search = $request->query('search');
            $books = Book::query();
            if (!empty($search)) {
                $books = $books->where('title', 'like', '%' . $search . '%')->orWhere('author', 'like', '%' . $search . '%');
            }

            return response()->json($books->with('cateBook')->orderBy('created_at','desc')->paginate($itemPerPage));
        }
    //
    //    public function test2(){
    //        $url = Storage::url('books/bngC1QqaM1kb8YhRYgKvQgAdc5uc1Ogq2YMNTqaU.jpg');
    //        return response()->json($url);
    //    }
}
