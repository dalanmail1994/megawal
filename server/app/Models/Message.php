<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'from',
        'ticket_id',
        'is_admin',
        'read_by_admin_at',
        'read_by_user_at',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'from');
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
