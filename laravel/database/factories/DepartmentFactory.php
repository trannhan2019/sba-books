<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Department>
 */
class DepartmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            [
                'name' => 'Phòng Tổ chức - Hành chính',
                'alias' => 'TCHC',
                'isActive' => true,
                'location' => 1,
                'company_id' => Company::factory()->create()->id
            ],
            [
                'name' => 'Phòng Kinh tế - Kế hoạch',
                'alias' => 'KTKH',
                'isActive' => true,
                'location' => 2,
                'company_id' => Company::factory()->create()->id
            ],
            [
                'name' => 'Phòng Kỹ thuật - Cơ điện',
                'alias' => 'KTCĐ',
                'isActive' => true,
                'location' => 4,
                'company_id' => Company::factory()->create()->id
            ],
            [
                'name' => 'Phòng Tài chính - Kế toán',
                'alias' => 'TCKT',
                'isActive' => true,
                'location' => 5,
                'company_id' => Company::factory()->create()->id
            ],
            [
                'name' => 'Trung tâm Tư vấn và Kiểm định an toàn đập',
                'alias' => 'TTTV',
                'isActive' => true,
                'location' => 6,
                'company_id' => Company::factory()->create()->id
            ],
            [
                'name' => 'Nhà máy thuỷ điện Khe Diên',
                'alias' => 'NMKD',
                'isActive' => true,
                'location' => 7,
                'company_id' => Company::factory()->create()->id
            ],
            [
                'name' => 'Nhà máy thuỷ điện Krông H\'năng',
                'alias' => 'NMKN',
                'isActive' => true,
                'location' => 8,
                'company_id' => Company::factory()->create()->id
            ],
        ];
    }
}
