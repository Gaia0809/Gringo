<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateVehicleRequest extends FormRequest
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
            'model_id' => 'sometimes|required|exists:vehicle_models,id',
            'license_plate' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'status_id' => 'sometimes|required|exists:statuses,id',
            'in_movement' => 'boolean',
            'battery_percentage' => 'nullable|integer|between:0,100',
            'station_id' => 'nullable|exists:stations,id',
            'km_total' => 'integer|min:0',
            'co2_saved' => 'integer|min:0',
        ];
    }
}
