<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTypeSeeder extends Seeder
{
    public function run()
    {
        DB::table('user_type')->insert([
            ['name' => 'Admin'],
            ['name' => 'Manager'],
            ['name' => 'Client'],
        ]);
    }
}


// DB::table('user_type')->insert([
//     ['name' => 'God'],
//     ['name' => 'Admin'],
//     ['name' => 'Manager'],
//     ['name' => 'Client'],
// ]);