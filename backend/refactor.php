<?php

$dir = __DIR__;

// Helper to replace in file
function replaceInFile($file, $replacements) {
    $content = file_get_contents($file);
    $newContent = strtr($content, $replacements);
    if ($content !== $newContent) {
        file_put_contents($file, $newContent);
    }
}

function regexReplaceInFile($file, $pattern, $replacement) {
    $content = file_get_contents($file);
    $newContent = preg_replace($pattern, $replacement, $content);
    if ($content !== $newContent) {
        file_put_contents($file, $newContent);
    }
}

// 1. Models renaming
$modelReplacements = [
    'class Booking extends' => 'class Booking extends',
    'class Intervention extends' => 'class Intervention extends',
    'class InterventionStatus extends' => 'class InterventionStatus extends',
    'class Issue extends' => 'class Issue extends',
    'class Report extends' => 'class Report extends',
    'class Role extends' => 'class Role extends',
    'class Station extends' => 'class Station extends',
    'class User extends' => 'class User extends',
    'class Vehicle extends' => 'class Vehicle extends',
    'class VehicleModel extends' => 'class VehicleModel extends',
    'class VehicleType extends' => 'class VehicleType extends',
    
    // Model Imports and references
    'App\Models\Booking' => 'App\Models\Booking',
    'App\Models\Intervention' => 'App\Models\Intervention',
    'App\Models\InterventionStatus' => 'App\Models\InterventionStatus',
    'App\Models\Issue' => 'App\Models\Issue',
    'App\Models\Report' => 'App\Models\Report',
    'App\Models\Role' => 'App\Models\Role',
    'App\Models\Station' => 'App\Models\Station',
    'App\Models\User' => 'App\Models\User',
    'App\Models\Vehicle' => 'App\Models\Vehicle',
    'App\Models\VehicleModel' => 'App\Models\VehicleModel',
    'App\Models\VehicleType' => 'App\Models\VehicleType',
    
    // Model references in static calls
    'Booking::' => 'Booking::',
    'Intervention::' => 'Intervention::',
    'InterventionStatus::' => 'InterventionStatus::',
    'Issue::' => 'Issue::',
    'Report::' => 'Report::',
    'Role::' => 'Role::',
    'Station::' => 'Station::',
    'User::' => 'User::',
    'Vehicle::' => 'Vehicle::',
    'VehicleModel::' => 'VehicleModel::',
    'VehicleType::' => 'VehicleType::',

    // Typehints and phpdoc
    ' Booking ' => ' Booking ',
    ' Intervention ' => ' Intervention ',
    ' InterventionStatus ' => ' InterventionStatus ',
    ' Issue ' => ' Issue ',
    ' Report ' => ' Report ',
    ' Role ' => ' Role ',
    ' Station ' => ' Station ',
    ' User ' => ' User ',
    ' Vehicle ' => ' Vehicle ',
    ' VehicleModel ' => ' VehicleModel ',
    ' VehicleType ' => ' VehicleType ',
    '(Booking $' => '(Booking $',
    '(Intervention $' => '(Intervention $',
    '(InterventionStatus $' => '(InterventionStatus $',
    '(Issue $' => '(Issue $',
    '(Report $' => '(Report $',
    '(Role $' => '(Role $',
    '(Station $' => '(Station $',
    '(User $' => '(User $',
    '(Vehicle $' => '(Vehicle $',
    '(VehicleModel $' => '(VehicleModel $',
    '(VehicleType $' => '(VehicleType $',
];

// 2. Controllers renaming
$controllerReplacements = [
    'class BookingController' => 'class BookingController',
    'class InterventionCategoryController' => 'class InterventionCategoryController',
    'class InterventionController' => 'class InterventionController',
    'class InterventionStatusController' => 'class InterventionStatusController',
    'class IssueController' => 'class IssueController',
    'class RoleController' => 'class RoleController',
    'class StationController' => 'class StationController',
    'class StatusController' => 'class StatusController',
    'class UserController' => 'class UserController',
    'class VehicleController' => 'class VehicleController',
    'class VehicleModelController' => 'class VehicleModelController',
    'class VehicleTypeController' => 'class VehicleTypeController',

    'App\Http\Controllers\BookingController' => 'App\Http\Controllers\BookingController',
    'App\Http\Controllers\InterventionCategoryController' => 'App\Http\Controllers\InterventionCategoryController',
    'App\Http\Controllers\InterventionController' => 'App\Http\Controllers\InterventionController',
    'App\Http\Controllers\InterventionStatusController' => 'App\Http\Controllers\InterventionStatusController',
    'App\Http\Controllers\IssueController' => 'App\Http\Controllers\IssueController',
    'App\Http\Controllers\RoleController' => 'App\Http\Controllers\RoleController',
    'App\Http\Controllers\StationController' => 'App\Http\Controllers\StationController',
    'App\Http\Controllers\StatusController' => 'App\Http\Controllers\StatusController',
    'App\Http\Controllers\UserController' => 'App\Http\Controllers\UserController',
    'App\Http\Controllers\VehicleController' => 'App\Http\Controllers\VehicleController',
    'App\Http\Controllers\VehicleModelController' => 'App\Http\Controllers\VehicleModelController',
    'App\Http\Controllers\VehicleTypeController' => 'App\Http\Controllers\VehicleTypeController',
    
    'BookingController::class' => 'BookingController::class',
    'InterventionCategoryController::class' => 'InterventionCategoryController::class',
    'InterventionController::class' => 'InterventionController::class',
    'InterventionStatusController::class' => 'InterventionStatusController::class',
    'IssueController::class' => 'IssueController::class',
    'RoleController::class' => 'RoleController::class',
    'StationController::class' => 'StationController::class',
    'StatusController::class' => 'StatusController::class',
    'UserController::class' => 'UserController::class',
    'VehicleController::class' => 'VehicleController::class',
    'VehicleModelController::class' => 'VehicleModelController::class',
    'VehicleTypeController::class' => 'VehicleTypeController::class',
];

// 3. Form Requests renaming
$requestReplacements = [
    'class StoreBookingRequest' => 'class StoreBookingRequest',
    'class UpdateBookingRequest' => 'class UpdateBookingRequest',
    'class StoreInterventionCategoryRequest' => 'class StoreInterventionCategoryRequest',
    'class UpdateInterventionCategoryRequest' => 'class UpdateInterventionCategoryRequest',
    'class StoreInterventionRequest' => 'class StoreInterventionRequest',
    'class UpdateInterventionRequest' => 'class UpdateInterventionRequest',
    'class StoreInterventionStatusRequest' => 'class StoreInterventionStatusRequest',
    'class UpdateInterventionStatusRequest' => 'class UpdateInterventionStatusRequest',
    'class StoreIssueRequest' => 'class StoreIssueRequest',
    'class UpdateIssueRequest' => 'class UpdateIssueRequest',
    'class StoreReportRequest' => 'class StoreReportRequest',
    'class UpdateReportRequest' => 'class UpdateReportRequest',
    'class StoreRoleRequest' => 'class StoreRoleRequest',
    'class UpdateRoleRequest' => 'class UpdateRoleRequest',
    'class StoreStationRequest' => 'class StoreStationRequest',
    'class UpdateStationRequest' => 'class UpdateStationRequest',
    'class StoreStatusRequest' => 'class StoreStatusRequest',
    'class UpdateStatusRequest' => 'class UpdateStatusRequest',
    'class StoreUserRequest' => 'class StoreUserRequest',
    'class UpdateUserRequest' => 'class UpdateUserRequest',
    'class StoreVehicleRequest' => 'class StoreVehicleRequest',
    'class UpdateVehicleRequest' => 'class UpdateVehicleRequest',
    'class StoreVehicleModelRequest' => 'class StoreVehicleModelRequest',
    'class UpdateVehicleModelRequest' => 'class UpdateVehicleModelRequest',
    'class StoreVehicleTypeRequest' => 'class StoreVehicleTypeRequest',
    'class UpdateVehicleTypeRequest' => 'class UpdateVehicleTypeRequest',

    'App\Http\Requests\StoreBookingRequest' => 'App\Http\Requests\StoreBookingRequest',
    'App\Http\Requests\UpdateBookingRequest' => 'App\Http\Requests\UpdateBookingRequest',
    'StoreBookingRequest' => 'StoreBookingRequest',
    'UpdateBookingRequest' => 'UpdateBookingRequest',
    
    'App\Http\Requests\StoreInterventionCategoryRequest' => 'App\Http\Requests\StoreInterventionCategoryRequest',
    'App\Http\Requests\UpdateInterventionCategoryRequest' => 'App\Http\Requests\UpdateInterventionCategoryRequest',
    'StoreInterventionCategoryRequest' => 'StoreInterventionCategoryRequest',
    'UpdateInterventionCategoryRequest' => 'UpdateInterventionCategoryRequest',
    
    'App\Http\Requests\StoreInterventionRequest' => 'App\Http\Requests\StoreInterventionRequest',
    'App\Http\Requests\UpdateInterventionRequest' => 'App\Http\Requests\UpdateInterventionRequest',
    'StoreInterventionRequest' => 'StoreInterventionRequest',
    'UpdateInterventionRequest' => 'UpdateInterventionRequest',
    
    'App\Http\Requests\StoreInterventionStatusRequest' => 'App\Http\Requests\StoreInterventionStatusRequest',
    'App\Http\Requests\UpdateInterventionStatusRequest' => 'App\Http\Requests\UpdateInterventionStatusRequest',
    'StoreInterventionStatusRequest' => 'StoreInterventionStatusRequest',
    'UpdateInterventionStatusRequest' => 'UpdateInterventionStatusRequest',

    'App\Http\Requests\StoreIssueRequest' => 'App\Http\Requests\StoreIssueRequest',
    'App\Http\Requests\UpdateIssueRequest' => 'App\Http\Requests\UpdateIssueRequest',
    'StoreIssueRequest' => 'StoreIssueRequest',
    'UpdateIssueRequest' => 'UpdateIssueRequest',
    
    'App\Http\Requests\StoreReportRequest' => 'App\Http\Requests\StoreReportRequest',
    'App\Http\Requests\UpdateReportRequest' => 'App\Http\Requests\UpdateReportRequest',
    'StoreReportRequest' => 'StoreReportRequest',
    'UpdateReportRequest' => 'UpdateReportRequest',
    
    'App\Http\Requests\StoreRoleRequest' => 'App\Http\Requests\StoreRoleRequest',
    'App\Http\Requests\UpdateRoleRequest' => 'App\Http\Requests\UpdateRoleRequest',
    'StoreRoleRequest' => 'StoreRoleRequest',
    'UpdateRoleRequest' => 'UpdateRoleRequest',
    
    'App\Http\Requests\StoreStationRequest' => 'App\Http\Requests\StoreStationRequest',
    'App\Http\Requests\UpdateStationRequest' => 'App\Http\Requests\UpdateStationRequest',
    'StoreStationRequest' => 'StoreStationRequest',
    'UpdateStationRequest' => 'UpdateStationRequest',
    
    'App\Http\Requests\StoreStatusRequest' => 'App\Http\Requests\StoreStatusRequest',
    'App\Http\Requests\UpdateStatusRequest' => 'App\Http\Requests\UpdateStatusRequest',
    'StoreStatusRequest' => 'StoreStatusRequest',
    'UpdateStatusRequest' => 'UpdateStatusRequest',
    
    'App\Http\Requests\StoreUserRequest' => 'App\Http\Requests\StoreUserRequest',
    'App\Http\Requests\UpdateUserRequest' => 'App\Http\Requests\UpdateUserRequest',
    'StoreUserRequest' => 'StoreUserRequest',
    'UpdateUserRequest' => 'UpdateUserRequest',
    
    'App\Http\Requests\StoreVehicleRequest' => 'App\Http\Requests\StoreVehicleRequest',
    'App\Http\Requests\UpdateVehicleRequest' => 'App\Http\Requests\UpdateVehicleRequest',
    'StoreVehicleRequest' => 'StoreVehicleRequest',
    'UpdateVehicleRequest' => 'UpdateVehicleRequest',
    
    'App\Http\Requests\StoreVehicleModelRequest' => 'App\Http\Requests\StoreVehicleModelRequest',
    'App\Http\Requests\UpdateVehicleModelRequest' => 'App\Http\Requests\UpdateVehicleModelRequest',
    'StoreVehicleModelRequest' => 'StoreVehicleModelRequest',
    'UpdateVehicleModelRequest' => 'UpdateVehicleModelRequest',
    
    'App\Http\Requests\StoreVehicleTypeRequest' => 'App\Http\Requests\StoreVehicleTypeRequest',
    'App\Http\Requests\UpdateVehicleTypeRequest' => 'App\Http\Requests\UpdateVehicleTypeRequest',
    'StoreVehicleTypeRequest' => 'StoreVehicleTypeRequest',
    'UpdateVehicleTypeRequest' => 'UpdateVehicleTypeRequest',
];

$allReplacements = array_merge($modelReplacements, $controllerReplacements, $requestReplacements);

$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
foreach ($iterator as $file) {
    if ($file->isFile() && $file->getExtension() === 'php' && strpos($file->getPathname(), 'vendor') === false && strpos($file->getPathname(), 'node_modules') === false) {
        replaceInFile($file->getPathname(), $allReplacements);
        
        // Fix policy returns
        if (strpos($file->getPathname(), 'app'.DIRECTORY_SEPARATOR.'Policies') !== false) {
            regexReplaceInFile($file->getPathname(), '/return false;/', 'return true;');
        }
        
        // Fix request authorize returns
        if (strpos($file->getPathname(), 'app'.DIRECTORY_SEPARATOR.'Http'.DIRECTORY_SEPARATOR.'Requests') !== false) {
            regexReplaceInFile($file->getPathname(), '/public function authorize\(\): bool\s*{\s*return false;\s*}/', "public function authorize(): bool\n    {\n        return true;\n    }");
        }
    }
}
echo "Refactoring completed.\n";
