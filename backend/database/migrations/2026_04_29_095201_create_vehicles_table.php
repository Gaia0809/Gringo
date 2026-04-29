<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('model_id')->constrained('vehicle_models')->cascadeOnDelete();
            $table->string('license_plate')->nullable();
            $table->string('position')->nullable();
            $table->foreignId('status_id')->constrained('statuses')->cascadeOnDelete();
            $table->boolean('in_movement')->default(false);
            $table->integer('battery_percentage')->nullable();
            $table->foreignId('station_id')->nullable()->constrained('stations')->cascadeOnDelete();
            $table->integer('km_total')->default(0);
            $table->integer('co2_saved')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
