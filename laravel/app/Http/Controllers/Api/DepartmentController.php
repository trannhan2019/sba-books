<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Department\DeleteDepartmentRequest;
use App\Http\Requests\Department\StoreDepartmentRequest;
use App\Http\Requests\Department\UpdateDepartmentRequest;
use App\Http\Resources\DepartmentResource;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function store(StoreDepartmentRequest $request)
    {
        $department = new Department();
        $department->name = $request->name;
        $department->alias = $request->alias;
        $department->isActive = $request->isActive;
        $department->location = $request->location;
        $department->company_id = $request->company_id;

        $department->save();
        return response()->json("New Department created", 201);
    }

    public function index(Request $request)
    {
        $itemPerPage = $request->query('item_per_page', 5);
        //fill by company name or alias
        $search = $request->query('search');
        $deparments = Department::query();
        if (!empty($search)) {
            $deparments = $deparments->where('name', 'like', '%' . $search . '%')->orWhere('alias', 'like', '%' . $search . '%');
        }

        return DepartmentResource::collection($deparments->with('company')->orderBy('location')->paginate($itemPerPage));
    }

    public function getCount()
    {
        return Department::count();
    }

    public function update(UpdateDepartmentRequest $request, $id)
    {
        $department = Department::findOrFail($id);

        $department->name = $request->name;
        $department->alias = $request->alias;
        $department->isActive = $request->isActive;
        $department->location = $request->location;
        $department->company_id = $request->company_id;

        $department->save();
        return response()->json('Department updated', 201);
    }

    public function destroy($id)
    {
        Department::findOrFail($id)->delete();
        return response()->json('Department deleted', 201);
    }

    public function destroyAll(DeleteDepartmentRequest $request)
    {
        // return response()->json($request);
        $ids = $request->ids;
        Department::destroy($ids);
        return response()->json('Companies deleted', 201);
    }

    public function getAll()
    {
        return response()->json(Department::orderBy('location')->select('id', 'name', 'alias')->get());
    }
}
