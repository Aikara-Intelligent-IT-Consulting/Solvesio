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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('type')->comment('new_offer, project_accepted, project_completed, project_update, payment_reminder');
            $table->string('title');
            $table->text('message');
            $table->integer('related_id')->nullable()->comment('ID terkait (offer_id, project_id, dll)');
            $table->string('related_type')->nullable()->comment('project_offer, active_project, dll');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
