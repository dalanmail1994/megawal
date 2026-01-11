<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->timestamp('read_by_admin_at')->nullable()->after('ticket_id');
            $table->timestamp('read_by_user_at')->nullable()->after('read_by_admin_at');
        });
    }

    public function down(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->dropColumn(['read_by_admin_at', 'read_by_user_at']);
        });
    }
};
