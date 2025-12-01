<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;

    protected $fillable = [
        'iso',
        'name',
        'logo',
        'coingecko_id',
    ];

    public function wallet()
    {
        return $this->hasOne(WalletToUser::class, 'currency_iso', 'iso');
    }


}
