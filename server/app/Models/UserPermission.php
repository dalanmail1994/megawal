<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPermission extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'email_on_account_change',
        'email_on_kyc_update',
        'email_on_login_attempt',
        'email_on_payment_notification',
        'email_crypto_news',
        'email_on_tx_sent',
        'email_on_tx_received',
        'email_on_stake_rewards',

        'is_send_crypto',
        'is_swap_crypto',
        'is_buy_crypto',
        'is_sell_crypto',
        'is_stake_crypto',

    ];

    protected $casts = [
        'email_on_account_change' => 'boolean',
        'email_on_kyc_update' => 'boolean',
        'email_on_login_attempt' => 'boolean',
        'email_on_payment_notification' => 'boolean',
        'email_crypto_news' => 'boolean',
        'email_on_tx_sent' => 'boolean',
        'email_on_tx_received' => 'boolean',
        'email_on_stake_rewards' => 'boolean',

        'is_send_crypto' => 'boolean',
        'is_swap_crypto' => 'boolean',
        'is_buy_crypto' => 'boolean',
        'is_sell_crypto' => 'boolean',
        'is_stake_crypto' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
