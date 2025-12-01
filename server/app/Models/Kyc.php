<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kyc extends Model
{
    protected $fillable = [
        'user_id',
        'status',
        'path',
        'document_type',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
