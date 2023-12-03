<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Book\DeleteBookRequest;
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

    public function index(Request $request)
    {
        $itemPerPage = $request->query('itemPerPage', 8);
        //fill by company name or alias
        $cateSelected = $request->query('cateSelected');
        $search = $request->query('search');
        $books = Book::query();
        if (!empty($cateSelected)) {
            $books = $books->whereIn('category_book_id', $cateSelected);
        }
        if (!empty($search)) {
            $books = $books->where('title', 'like', '%' . $search . '%')->orWhere('author', 'like', '%' . $search . '%');
        }

        return response()->json($books->with('cateBook')->orderBy('created_at', 'desc')->paginate($itemPerPage));
    }

    public function update(StoreBookRequest $request, $id)
    {
        $book = Book::findOrFail($id);

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
            if (!empty($book->photo)) {
                Storage::delete($book->photo);
            }
            $path = Storage::put('books', $request->photo);
            $book->photo = $path;
        }
        $book->save();
        return response()->json('Updated !!', 201);
        //return response()->json($request->title, 201);
    }

    public function destroy($id)
    {
        $book = Book::findOrFail($id);
        if (!empty($book->photo)) {
            Storage::delete($book->photo);
        }
        $book->delete();
        return response()->json('Book deleted', 201);
    }

    public function destroyAll(DeleteBookRequest $request)
    {
        // return response()->json($request);
        $ids = $request->ids;

        $bookList = Book::whereIn('id', $ids)->get();

         foreach ($bookList as $book) {
             if (!empty($book->photo)) {
                 Storage::delete($book->photo);
             }
         }

         Book::destroy($ids);
         return response()->json('Books deleted', 201);
//        return response()->json($bookList, 201);
    }
}
