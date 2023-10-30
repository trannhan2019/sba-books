<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Department;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class SeedingDataController extends Controller
{
    public function seed()
    {
        $company = Company::create([
            'name' => 'Công ty cổ phần Sông Ba',
            'alias' => 'SBA',
            'isActive' => true
        ]);

        Department::insert([
            [
                'name' => 'Hội đồng quản trị',
                'alias' => 'HĐQT',
                'isActive' => true,
                'location' => 1,
                'company_id' => $company->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Ban Kiểm soát',
                'alias' => 'BKS',
                'isActive' => true,
                'location' => 2,
                'company_id' => $company->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Ban Tổng giám đốc',
                'alias' => 'BTGĐ',
                'isActive' => true,
                'location' => 3,
                'company_id' => $company->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Phòng Tổ chức - Hành chính',
                'alias' => 'TCHC',
                'isActive' => true,
                'location' => 4,
                'company_id' => $company->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Phòng Kinh tế - Kế hoạch',
                'alias' => 'KTKH',
                'isActive' => true,
                'location' => 5,
                'company_id' => $company->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Phòng Kỹ thuật - Cơ điện',
                'alias' => 'KTCĐ',
                'isActive' => true,
                'location' => 6,
                'company_id' => $company->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Phòng Tài chính - Kế toán',
                'alias' => 'TCKT',
                'isActive' => true,
                'location' => 7,
                'company_id' => $company->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Trung tâm Tư vấn và Kiểm định an toàn đập',
                'alias' => 'TTTV',
                'isActive' => true,
                'location' => 8,
                'company_id' => $company->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Nhà máy thuỷ điện Khe Diên',
                'alias' => 'NMKD',
                'isActive' => true,
                'location' => 9,
                'company_id' => $company->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Nhà máy thuỷ điện Krông H\'năng',
                'alias' => 'NMKN',
                'isActive' => true,
                'location' => 10,
                'company_id' => $company->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);

        Role::insert([
            [
                'name' => 'user', 'guard_name' => 'web', 'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'manager', 'guard_name' => 'web', 'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'administrator', 'guard_name' => 'web', 'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);

        return response()->json('done');
    }
}
