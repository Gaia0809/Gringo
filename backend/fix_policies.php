<?php
$dir = __DIR__ . '/app/Policies';

$replacements = [
    'use App\Models\bookings;' => 'use App\Models\Booking;',
    'use App\Models\intervention_categories;' => 'use App\Models\InterventionCategory;',
    'use App\Models\interventions;' => 'use App\Models\Intervention;',
    'use App\Models\intervention_statuses;' => 'use App\Models\InterventionStatus;',
    'use App\Models\issues;' => 'use App\Models\Issue;',
    'use App\Models\roles;' => 'use App\Models\Role;',
    'use App\Models\stations;' => 'use App\Models\Station;',
    'use App\Models\statuses;' => 'use App\Models\Status;',
    'use App\Models\users;' => 'use App\Models\User;',
    'use App\Models\vehicle_models;' => 'use App\Models\VehicleModel;',
    'use App\Models\vehicles;' => 'use App\Models\Vehicle;',
    'use App\Models\vehicle_types;' => 'use App\Models\VehicleType;',
    
    // Typehints in methods
    ' bookings $bookings' => ' Booking $booking',
    ' intervention_categories $interventionCategories' => ' InterventionCategory $interventionCategory',
    ' interventions $interventions' => ' Intervention $intervention',
    ' intervention_statuses $interventionStatuses' => ' InterventionStatus $interventionStatus',
    ' issues $issues' => ' Issue $issue',
    ' roles $roles' => ' Role $role',
    ' stations $stations' => ' Station $station',
    ' statuses $statuses' => ' Status $status',
    ' users $users' => ' User $user',
    ' vehicle_models $vehicleModels' => ' VehicleModel $vehicleModel',
    ' vehicles $vehicles' => ' Vehicle $vehicle',
    ' vehicle_types $vehicleTypes' => ' VehicleType $vehicleType',
];

$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
foreach ($iterator as $file) {
    if ($file->isFile() && $file->getExtension() === 'php') {
        $content = file_get_contents($file->getPathname());
        $newContent = strtr($content, $replacements);
        if ($content !== $newContent) {
            file_put_contents($file->getPathname(), $newContent);
        }
    }
}
echo "Policy fixes done.\n";
