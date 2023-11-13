<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Book\StoreBookRequest;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    public function store(Request $request)
    {
        $book = new Book();
        $book->title = $request->title;
        // $book->description = $request->description;
        // $book->quantity = $request->quantity;
        // $book->author = $request->author;
        // $book->code = $request->code;
        // $book->storage_location = $request->storage_location;
        // $book->more_info = $request->more_info;
        // $book->category_book_id = $request->category_book_id;
        //        image
        // if ($request->has('photo')) {
        //     // foreach ($request->file('photo') as $img) {
        //     //     $path = Storage::put('books', $img);
        //     //     $book->photo = $path;
        //     // }
        //     // $path = Storage::put('books', $request->file('photo[0]'));
        //     // $path = $request->file('photo[0]->path')->store('books');
        //     $book->photo = $request->file('photo');
        // }
        if (!empty($request->photo)) {
            $request->validate([
                'photo' => 'image|size:1024'
            ]);
            $path = Storage::put('books', $request->photo);
            $book->photo = $path;
            // foreach ($request->file('photo') as $img) {
            //     $path = Storage::put('books', $img);
            //     $book->photo = $path;
            // }
        }

        // $book->save();
        return response()->json($book, 201);
    }
    //    public function test(Request $request){
    //        $path = Storage::put('books',$request->photo);
    //        return response()->json($path);
    //    }
    //
    //    public function test2(){
    //        $url = Storage::url('books/bngC1QqaM1kb8YhRYgKvQgAdc5uc1Ogq2YMNTqaU.jpg');
    //        return response()->json($url);
    //    }
}
