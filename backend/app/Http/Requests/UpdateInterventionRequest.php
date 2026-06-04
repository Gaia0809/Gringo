<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateInterventionRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => 'sometimes|required|exists:intervention_categories,id',
            'issue_id' => 'nullable|exists:issues,id',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status_id' => 'sometimes|required|exists:intervention_statuses,id',
            'planned_date' => 'nullable|date',
        ];
    }
}
