<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Role\StoreUpdateRoleRequest;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function store(StoreUpdateRoleRequest $request)
    {
        Role::create(['name' => $request->name]);
        return response()->json("New Role created", 201);
    }

    public function index()
    {
        return response()->json(Role::all());
    }

    public function update(StoreUpdateRoleRequest $request, $id)
    {
        $role = Role::findOrFail($id);
        $role->name = $request->name;
        $role->save();
        return response()->json('Role updated', 201);
    }

    public function destroy($id)
    {
        Role::findOrFail($id)->delete();
        return response()->json('Role deleted', 201);
    }
}
