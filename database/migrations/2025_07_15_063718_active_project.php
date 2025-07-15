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
        Schema::create('active_projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offer_id')->constrained('project_offers')->onDelete('cascade');
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null')->comment('team member yang mengerjakan');
            $table->decimal('final_budget', 15, 2);
            $table->integer('final_timeline');
            $table->date('start_date');
            $table->date('estimated_completion');
            $table->date('actual_completion')->nullable();
            $table->string('status')->default('in_progress')->comment('in_progress, completed, cancelled');
            $table->integer('progress_percentage')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('active_projects');
    }
};
