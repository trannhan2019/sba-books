<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Company\DeleteCompanyRequest;
use App\Http\Requests\Company\StoreCompanyRequest;
use App\Http\Requests\Company\UpdateCompanyRequest;
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

    public function destroy($id)
    {
        Company::findOrFail($id)->delete();
        return response()->json('Company deleted', 201);
    }

    public function destroyAll(DeleteCompanyRequest $request)
    {
        // return response()->json($request);
        $ids = $request->ids;
        Company::destroy($ids);
        return response()->json('Companies deleted', 201);
    }

    // public function show($id)
    // {
    //     return new CompanyResource(Company::findOrFail($id));
    // }

    public function update(UpdateCompanyRequest $request, $id)
    {
        $company = Company::findOrFail($id);
        $company->name = $request->name;
        $company->alias = $request->alias;
        $company->isActive = $request->isActive;

        $company->save();
        return response()->json('Company updated', 201);
    }

    public function getAll()
    {
        return CompanyResource::collection(Company::orderBy('alias')->get());
    }
}
