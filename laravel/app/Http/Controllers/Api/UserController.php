<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use function Laravel\Prompts\search;

class UserController extends Controller
{
    public function store(StoreUserRequest $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->username = $request->username;
        $user->password = Hash::make($request->password);
        $user->isActive = $request->isActive;
        $user->location = $request->location;
        $user->department_id = $request->department_id;
        //role
        $user->assignRole($request->role);

        $user->save();
        return response()->json("New user created", 201);
    }

    public function index(Request $request)
    {
        $itemPerPage = $request->query('item_per_page', 5);
        //fill by company name or username
        $search = $request->query('search');
        $selected = $request->query('selectDepartment');
        $users = User::query();
        if (!empty($selected)) {
            $users = $users->where('department_id', $selected);
        }
        if (!empty($search)) {
            $users = $users->where('name', 'like', '%' . $search . '%')->orWhere('username', 'like', '%' . $search . '%');
            // return response()->json('yes');
        }


        return response()->json($users->with(['roles', 'department'])->orderBy('location')->paginate($itemPerPage));
        // return response()->json('no');
    }

    // public function getCount()
    // {
    //     return Department::count();
    // }

    // public function update(UpdateDepartmentRequest $request, $id)
    // {
    //     $department = Department::findOrFail($id);

    //     $department->name = $request->name;
    //     $department->alias = $request->alias;
    //     $department->isActive = $request->isActive;
    //     $department->location = $request->location;
    //     $department->company_id = $request->company_id;

    //     $department->save();
    //     return response()->json('Department updated', 201);
    // }

    // public function destroy($id)
    // {
    //     Department::findOrFail($id)->delete();
    //     return response()->json('Department deleted', 201);
    // }

    // public function destroyAll(DeleteDepartmentRequest $request)
    // {
    //     // return response()->json($request);
    //     $ids = $request->ids;
    //     Department::destroy($ids);
    //     return response()->json('Companies deleted', 201);
    // }

    // public function getAll()
    // {
    //     return response()->json(Department::orderBy('location')->select('id', 'name', 'alias')->get());
    // }
}
