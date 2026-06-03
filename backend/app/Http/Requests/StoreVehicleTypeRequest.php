<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'      => 'sometimes|string|max:255',
            'status'     => 'sometimes|string|exists:intervention_statuses,name',
            'priority'   => 'sometimes|in:Alta,Media,Bassa',
            'vehicle_id' => 'sometimes|nullable|exists:vehicles,id',
            'station_id' => 'sometimes|nullable|exists:stations,id',
            'technician_id' => 'sometimes|nullable|exists:users,id',
            'description'=> 'sometimes|nullable|string',
        ];
    }
}
