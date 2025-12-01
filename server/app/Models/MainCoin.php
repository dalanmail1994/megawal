<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MainCoin extends Model
{
    use HasFactory;

    /**
     * שם הטבלה
     */
    protected $table = 'main_coins';

    /**
     * שדות מותרים ל-mass assignment
     */
    protected $fillable = [
        'name',
        'title',
        'symbole',
    ];

    /**
     * קשר לכל המשתמשים שיש להם את המטבע הזה
     */
    public function users()
    {
        return $this->hasMany(User::class, 'main_coin_id');
    }
}
