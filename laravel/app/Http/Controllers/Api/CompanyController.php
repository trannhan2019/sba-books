<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreCompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function store(StoreCompanyRequest $request)
    {
        $company = new Company();
        $company->name = $request->name;
        $company->alias = $request->alias;
        $company->isActive = $request->isActive;

        $company->save();
        return response()->json("New company created", 201);
    }

    public function index(Request $request)
    {
        $itemPerPage = $request->query('item_per_page', 5);

        //fill by company name
        $search_name = $request->query('search_name');
        $companies = Company::query();
        if (!empty($search_name)) {
            $companies = $companies->where('name', 'like', '%' . $search_name . '%');
        }

        return CompanyResource::collection($companies->latest('created_at')->paginate($itemPerPage));
    }
}
