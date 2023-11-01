<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\DeleteUserRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
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
            $users->where('department_id', $selected)->where('name', 'like', '%' . $search . '%');
        }
        $users->where('name', 'like', '%' . $search . '%');
        return response()->json($users->with(['roles', 'department'])->orderBy('location')->paginate($itemPerPage));
    }

    // public function getCount()
    // {
    //     return Department::count();
    // }

    public function update(UpdateUserRequest $request, $id)
    {
        $user = User::findOrFail($id);

        $user->name = $request->name;
        $user->isActive = $request->isActive;
        $user->location = $request->location;
        $user->department_id = $request->department_id;
        //role
        $user->syncRoles($request->role);
        //changePassword
        if (!empty($request->password)) {
            $user->password = Hash::make($request->password);
        }
        $user->save();
        return response()->json('updated', 201);
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return response()->json('User deleted', 201);
    }

    public function destroyAll(DeleteUserRequest $request)
    {
        // return response()->json($request);
        $ids = $request->ids;
        User::destroy($ids);
        return response()->json('User list deleted', 201);
    }

    // public function getAll()
    // {
    //     return response()->json(Department::orderBy('location')->select('id', 'name', 'alias')->get());
    // }
}
