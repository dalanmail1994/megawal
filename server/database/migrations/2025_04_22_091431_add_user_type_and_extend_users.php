<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // טבלת סוגי משתמש
        Schema::create('user_type', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });

        // טבלת מטבעות ראשיים
        Schema::create('main_coins', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('title');
            $table->string('symbole');
            $table->timestamps();
        });

        // עדכון טבלת users
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('user_type_id')->after('id')->nullable();
            $table->unsignedBigInteger('office_id')->nullable()->after('user_type_id');

            $table->string('first_name')->after('email')->nullable();
            $table->string('last_name')->after('first_name')->nullable();

            $table->timestamp('last_login')->nullable()->after('remember_token');
            $table->timestamp('last_action')->nullable()->after('last_login');

            $table->unsignedBigInteger('main_coin_id')->default(1)->after('last_action');

            $table->boolean('is_ban')->default(false)->after('main_coin_id');
            $table->string('last_ip')->nullable()->after('is_ban');
            $table->string('iso')->nullable()->after('last_ip');

            $table->foreign('user_type_id')
                ->references('id')
                ->on('user_type')
                ->onDelete('set null');

            $table->foreign('office_id')
                ->references('id')
                ->on('offices')
                ->onDelete('set null');

            $table->foreign('main_coin_id')
                ->references('id')
                ->on('main_coins'); // ללא onDelete, כדי לשמור על default(1)
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['user_type_id']);
            $table->dropForeign(['office_id']);
            $table->dropForeign(['main_coin_id']);

            $table->dropColumn([
                'user_type_id',
                'office_id',
                'first_name',
                'last_name',
                'last_login',
                'last_action',
                'main_coin_id',
                'is_ban',

                'is_send_crypto',
                'is_swap_crypto',
                'is_buy_crypto',
                'is_sell_crypto',
                'is_stake_crypto',
                'last_ip',
            ]);
        });

        Schema::dropIfExists('main_coins');
        Schema::dropIfExists('user_type');
    }
};
