<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * השדות שמותרים ל-mass assignment
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_type_id',
        'office_id',
        'email',
        'first_name',
        'last_name',
        'password',
        
        'last_login',
        'last_action',
        'main_coin_id',
        'is_ban',
        'last_ip',
        'iso',
    ];

    /**
     * שדות מוסתרים כאשר ממירים את המודל למערך / JSON
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * קסטינג לשדות לפי טיפוסים
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'last_login' => 'datetime',
            'last_action' => 'datetime',
            'is_ban' => 'boolean',
            'main_coin_id' => 'string',
            'password' => 'hashed',
            'last_ip' => 'string',
            'iso' => 'string',
        ];
    }


    public function mainCoin()
    {
        return $this->belongsTo(MainCoin::class, 'main_coin_id');
    }

    protected static function booted(): void
    {
        static::created(function (User $user) {
            UserPermission::create([
                'user_id' => $user->id,
                // ערכים ברירת מחדל - לא חובה כי כבר מוגדרים במיגרציה
            ]);
        });
    }

    public function permissions()
    {
        return $this->hasOne(UserPermission::class);
    }


    public function paymentMethods()
    {
        return $this->hasMany(PaymentMethod::class);
    }

}
