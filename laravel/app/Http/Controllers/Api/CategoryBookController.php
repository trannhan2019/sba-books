<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CategoryBook;
use App\Http\Requests\CategoryBook\StoreUpdateCategoryBookRequest;

class CategoryBookController extends Controller
{
    public function store(StoreUpdateCategoryBookRequest $request)
    {
        CategoryBook::create(['name' => $request->name]);
        return response()->json("New Category Book created", 201);
    }

    public function index(Request $request)
    {
        $itemPerPage = $request->query('item_per_page', 5);
        //fill by company name or alias
        $search = $request->query('search');
        $categories = CategoryBook::query();
        if (!empty($search)) {
            $categories = $categories->where('name', 'like', '%' . $search . '%');
        }

        return response()->json($categories->paginate($itemPerPage)) ;
        // return response()->json(CategoryBook::all());
    }

    public function update(StoreUpdateRoleRequest $request, $id)
    {
        $category = CategoryBook::findOrFail($id);
        $category->name = $request->name;
        $category->save();
        return response()->json('CategoryBook updated', 201);
    }

    public function destroy($id)
    {
        CategoryBook::findOrFail($id)->delete();
        return response()->json('CategoryBook deleted', 201);
    }
}
