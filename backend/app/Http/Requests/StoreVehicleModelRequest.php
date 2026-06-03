<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleModelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'      => 'required|string|max:255',
            'priority'   => 'nullable|in:Alta,Media,Bassa',
            'vehicle_id' => 'nullable|exists:vehicles,id',
            'station_id' => 'nullable|exists:stations,id',
            'technician_id' => 'nullable|exists:users,id',
            'description'=> 'nullable|string',
            'note'       => 'nullable|string',
        ];
    }
}
