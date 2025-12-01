<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'user_id',
        'card_number',
        'card_name',
        'expiration_date',
        'cvv',
        'account_number',
        'name',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
