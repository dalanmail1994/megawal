<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();

            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending');
            $table->decimal('amount', 38, 12);
            $table->string('from_public_address')->nullable();
            $table->string('to_public_address')->nullable();
            $table->string('transaction_hash');
            $table->boolean('mod');
            $table->dateTime('date');
            $table->text('descreption')->nullable();
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('user_id');
            $table->string('currency_iso');

            $table->timestamps();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('currency_iso')->references('iso')->on('currencies')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
