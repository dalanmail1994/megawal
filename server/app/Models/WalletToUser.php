<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WalletToUser extends Model
{
    use HasFactory;

    protected $table = 'wallet_to_user';

    protected $fillable = [
        'user_id',
        'currency_iso',
        'public_key',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_iso', 'iso');
    }
}
