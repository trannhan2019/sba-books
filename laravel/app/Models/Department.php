<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'alias',
        'isActive',
        'company_id'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
