<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Log extends Model
{
    protected $fillable = [
        'user_id',
        'to_user',
        'method',
        'path',
        'payload',
        'title',
    ];

    /**
     * המשתמש שביצע את הבקשה
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
        
    public function targetUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'to_user');
    }
}
