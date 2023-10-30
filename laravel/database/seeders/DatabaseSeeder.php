<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Company;
use App\Models\Department;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        // Company::factory()->create();

        // Department::factory()->create();


        // Role::factory()->create([
        //     ['name' => 'user', 'guard_name' => 'web'],
        //     ['name' => 'manager', 'guard_name' => 'web'],
        //     ['name' => 'administrator', 'guard_name' => 'web'],
        // ]);
    }
}
