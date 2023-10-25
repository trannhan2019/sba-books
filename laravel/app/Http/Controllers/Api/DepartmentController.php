<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Department\StoreDepartmentRequest;
use App\Models\Company;
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
        $department->company_id = $request->company_id;

        $department->save();
        return response()->json("New Department created", 201);
    }

    public function index()
    {
        $deparments = Department::with('company')->get();
        // $companies = $deparments->company;
        // foreach ($deparments as $department) {

        //     $companies->push($department->company);
        // }
        // $company = Company::find(11);
        // $deparments = $company->departments;

        return response()->json($deparments);
    }
}
