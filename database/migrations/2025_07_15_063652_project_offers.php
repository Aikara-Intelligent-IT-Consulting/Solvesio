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
        Schema::create('project_offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->string('type')->comment('website, design, marketing, mobile_app, others');
            $table->decimal('budget', 15, 2)->nullable();
            $table->string('currency')->default('IDR');
            $table->integer('timeline_days')->nullable()->comment('perkiraan waktu pengerjaan dalam hari');
            $table->text('requirements')->nullable()->comment('detail requirements dari client');
            $table->string('status')->default('pending')->comment('pending, accepted, rejected, negotiating');
            $table->text('admin_notes')->nullable()->comment('catatan internal admin');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_offers');
    }
};
