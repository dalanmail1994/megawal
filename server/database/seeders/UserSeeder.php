<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserType;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'first_name'    => "God",
            'last_name'     => "All",
            'email'         => "god@mega.com",
            'password'      => bcrypt('123abc'),
            'user_type_id'  => 1,
        ]);

        // User::factory()->count(2)->create([
        //     'user_type_id' => UserType::where('name', 'Admin')->first()->id,
        // ]);

        // User::factory()->count(5)->create([
        //     'user_type_id' => UserType::where('name', 'Manager')->first()->id,
        // ]);

        // User::factory()->count(8)->create([
        //     'user_type_id' => UserType::where('name', 'Client')->first()->id,
        // ]);
    }
}
