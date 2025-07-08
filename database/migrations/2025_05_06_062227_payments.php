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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->enum('type', ['DP', 'Pelunasan', 'Milestone']);
            $table->unsignedBigInteger('amount');
            $table->enum('status', ['menunggu_verifikasi', 'valid'])->default('menunggu_verifikasi');
            $table->string('bukti_transfer')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
