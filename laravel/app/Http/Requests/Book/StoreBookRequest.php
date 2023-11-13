<?php

namespace App\Http\Requests\Book;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required',
            'category_book_id' => 'required',
            'code' => 'required',
            'storage_location' => 'required',
            'photo' => 'sometimes|mimes:jpeg,jpg,png,gif|max:100000',
            // 'photo' => 'nullable|mimes:jpeg,jpg,png,gif|max:100000'
        ];
    }
}
