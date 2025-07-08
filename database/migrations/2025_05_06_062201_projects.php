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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('team_id')->nullable()->constrained(); // jika ingin menghubungkan ke team Jetstream
            $table->string('title');
            $table->string('project_type');
            $table->text('description');
            $table->unsignedTinyInteger('progress')->default(0); // 0 - 100
            $table->enum('status', ['menunggu_dp', 'dikerjakan', 'revisi', 'selesai'])->default('menunggu_dp');
            $table->date('start_date')->nullable();
            $table->date('due_date')->nullable();
            $table->timestamps();
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
