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
        Schema::create('book_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exchange_user_id')->constrained('users');
            $table->foreignId('book_id')->constrained('books');
            $table->foreignId('verify_user_id')->constrained('users');
            $table->dateTime('exchanged_at')->nullable();
            $table->dateTime('verified_at')->nullable();
            $table->dateTime('returned_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_histories');
    }
};
