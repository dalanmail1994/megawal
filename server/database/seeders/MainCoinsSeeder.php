<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MainCoin;

class MainCoinsSeeder extends Seeder
{
    public function run(): void
    {
        $coins = [
            [
                'name'    => 'usd',
                'title'   => 'US Dollar',
                'symbole' => '$',
            ],
            [
                'name'    => 'eur',
                'title'   => 'Euro',
                'symbole' => '€',
            ],
        ];

        foreach ($coins as $coin) {
            MainCoin::updateOrCreate(['name' => $coin['name']], $coin);
        }
    }
}
