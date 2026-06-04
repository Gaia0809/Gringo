<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Role;
use App\Models\Status;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Carbon\Carbon;

class BookingTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;
    protected $client;
    protected $disponibile;
    protected $prenotato;
    protected $vehicle;

    protected function setUp(): void
    {
        parent::setUp();

        $adminRole = Role::create(['name' => 'Admin']);
        $clientRole = Role::create(['name' => 'Client']);

        $this->admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role_id' => $adminRole->id,
        ]);

        $this->client = User::create([
            'name' => 'Client User',
            'email' => 'client@example.com',
            'password' => Hash::make('password'),
            'role_id' => $clientRole->id,
        ]);

        $this->disponibile = Status::create(['name' => 'Disponibile']);
        $this->prenotato = Status::create(['name' => 'Prenotato']);

        // Mock di un veicolo e relativi modelli
        $vehicleType = \App\Models\VehicleType::create(['name' => 'Auto']);
        $vehicleModel = \App\Models\VehicleModel::create([
            'name' => 'Model 3',
            'type_id' => $vehicleType->id,
            'brand' => 'Tesla'
        ]);

        $this->vehicle = Vehicle::create([
            'model_id' => $vehicleModel->id,
            'license_plate' => 'ABC1234',
            'status_id' => $this->disponibile->id,
            'battery_percentage' => 100,
        ]);
    }

    public function test_user_can_only_see_their_bookings()
    {
        $otherUser = User::factory()->create(['role_id' => $this->client->role_id]);
        
        Booking::create([
            'user_id' => $this->client->id,
            'vehicle_id' => $this->vehicle->id,
            'start_date' => Carbon::now()->addDay(),
            'end_date' => Carbon::now()->addDays(2),
        ]);

        Booking::create([
            'user_id' => $otherUser->id,
            'vehicle_id' => $this->vehicle->id,
            'start_date' => Carbon::now()->addDays(5),
            'end_date' => Carbon::now()->addDays(6),
        ]);

        $response = $this->actingAs($this->client)->getJson('/api/bookings');

        $response->assertStatus(200);
        $response->assertJsonCount(1);
    }

    public function test_admin_can_see_all_bookings()
    {
        $otherUser = User::factory()->create(['role_id' => $this->client->role_id]);
        
        Booking::create([
            'user_id' => $this->client->id,
            'vehicle_id' => $this->vehicle->id,
            'start_date' => Carbon::now()->addDay(),
            'end_date' => Carbon::now()->addDays(2),
        ]);

        Booking::create([
            'user_id' => $otherUser->id,
            'vehicle_id' => $this->vehicle->id,
            'start_date' => Carbon::now()->addDays(5),
            'end_date' => Carbon::now()->addDays(6),
        ]);

        $response = $this->actingAs($this->admin)->getJson('/api/bookings');

        $response->assertStatus(200);
        $response->assertJsonCount(2);
    }

    public function test_user_can_create_booking_for_themselves()
    {
        $payload = [
            'vehicle_id' => $this->vehicle->id,
            'start_date' => Carbon::now()->addDay()->toDateTimeString(),
            'end_date' => Carbon::now()->addDays(2)->toDateTimeString(),
        ];

        $response = $this->actingAs($this->client)->postJson('/api/bookings', $payload);

        $response->assertStatus(201);
        $this->assertDatabaseHas('bookings', ['user_id' => $this->client->id]);
        $this->assertEquals($this->prenotato->id, $this->vehicle->fresh()->status_id);
    }

    public function test_user_cannot_create_booking_longer_than_3_days()
    {
        $payload = [
            'vehicle_id' => $this->vehicle->id,
            'start_date' => Carbon::now()->addDay()->toDateTimeString(),
            'end_date' => Carbon::now()->addDays(5)->toDateTimeString(),
        ];

        $response = $this->actingAs($this->client)->postJson('/api/bookings', $payload);

        $response->assertStatus(422);
    }

    public function test_user_cannot_book_vehicle_already_booked()
    {
        Booking::create([
            'user_id' => $this->admin->id,
            'vehicle_id' => $this->vehicle->id,
            'start_date' => Carbon::now()->addDay(),
            'end_date' => Carbon::now()->addDays(2),
        ]);

        $this->vehicle->update(['status_id' => $this->prenotato->id]);

        $payload = [
            'vehicle_id' => $this->vehicle->id,
            'start_date' => Carbon::now()->addDay(),
            'end_date' => Carbon::now()->addDays(2),
        ];

        $response = $this->actingAs($this->client)->postJson('/api/bookings', $payload);

        $response->assertStatus(422);
    }

    public function test_user_can_cancel_their_own_booking()
    {
        $booking = Booking::create([
            'user_id' => $this->client->id,
            'vehicle_id' => $this->vehicle->id,
            'start_date' => Carbon::now()->addDay(),
            'end_date' => Carbon::now()->addDays(2),
        ]);

        $this->vehicle->update(['status_id' => $this->prenotato->id]);

        $response = $this->actingAs($this->client)->deleteJson("/api/bookings/{$booking->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('bookings', ['id' => $booking->id]);
        $this->assertEquals($this->disponibile->id, $this->vehicle->fresh()->status_id);
    }

    public function test_user_cannot_cancel_others_booking()
    {
        $otherUser = User::factory()->create(['role_id' => $this->client->role_id]);
        $booking = Booking::create([
            'user_id' => $otherUser->id,
            'vehicle_id' => $this->vehicle->id,
            'start_date' => Carbon::now()->addDay(),
            'end_date' => Carbon::now()->addDays(2),
        ]);

        $response = $this->actingAs($this->client)->deleteJson("/api/bookings/{$booking->id}");

        $response->assertStatus(403);
    }

    public function test_only_admin_can_access_roles_and_statuses()
    {
        $this->actingAs($this->client)->getJson('/api/roles')->assertStatus(403);
        $this->actingAs($this->client)->getJson('/api/statuses')->assertStatus(403);

        $this->actingAs($this->admin)->getJson('/api/roles')->assertStatus(200);
        $this->actingAs($this->admin)->getJson('/api/statuses')->assertStatus(200);
    }
}
