<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_permissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->boolean('email_on_account_change')->default(true);
            $table->boolean('email_on_kyc_update')->default(true);
            $table->boolean('email_on_login_attempt')->default(true);
            $table->boolean('email_on_payment_notification')->default(true);
            $table->boolean('email_crypto_news')->default(true);
            $table->boolean('email_on_tx_sent')->default(true);
            $table->boolean('email_on_tx_received')->default(true);
            $table->boolean('email_on_stake_rewards')->default(true);

            $table->boolean('is_send_crypto')->default(true);
            $table->boolean('is_swap_crypto')->default(true);
            $table->boolean('is_buy_crypto')->default(true);
            $table->boolean('is_sell_crypto')->default(true);
            $table->boolean('is_stake_crypto')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_permissions');
    }
};