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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('description');
            $table->decimal('amount', 12, 2);
            $table->enum('type', ['income', 'expense']);
            $table->enum('status', ['completed', 'pending'])->default('completed');
            $table->dateTime('occurred_at');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'occurred_at']);
            $table->index(['user_id', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
