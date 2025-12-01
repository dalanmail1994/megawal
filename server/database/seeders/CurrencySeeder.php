<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrencySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('currencies')->insert([
            [
                'iso' => 'BTC',
                'name' => 'Bitcoin',
                'coingecko_id' => 'bitcoin',
                'logo' => '/coins/btc.svg',
            ],
            [
                'iso' => 'ETH',
                'name' => 'Ethereum',
                'coingecko_id' => 'ethereum',
                'logo' => '/coins/eth.svg',
            ],
            [
                'iso' => 'USDT',
                'name' => 'USDT',
                'coingecko_id' => 'tether',
                'logo' => '/coins/usdt.svg',
            ],
            [
                'iso' => 'BNB',
                'name' => 'BNB',
                'coingecko_id' => 'binancecoin',
                'logo' => '/coins/bnb.svg',
            ],
            [
                'iso' => 'SOL',
                'name' => 'Solana',
                'coingecko_id' => 'solana',
                'logo' => '/coins/solana.svg',
            ],
            [
                'iso' => 'XRP',
                'name' => 'Ripple',
                'coingecko_id' => 'ripple',
                'logo' => '/coins/xrp.svg',
            ],
            [
                'iso' => 'ADA',
                'name' => 'Cardano',
                'coingecko_id' => 'cardano',
                'logo' => '/coins/ada.svg',
            ],
            [
                'iso' => 'DOGE',
                'name' => 'Dogecoin',
                'coingecko_id' => 'dogecoin',
                'logo' => '/coins/doge.svg',
            ],
            [
                'iso' => 'LTC',
                'name' => 'Litecoin',
                'coingecko_id' => 'litecoin',
                'logo' => '/coins/ltc.svg',
            ],
            [
                'iso' => 'XMR',
                'name' => 'Monero',
                'coingecko_id' => 'monero',
                'logo' => '/coins/xmr.svg',
            ],
            [
                'iso' => 'MATIC',
                'name' => 'Polygon',
                'coingecko_id' => 'polygon',
                'logo' => '/coins/matic.svg',
            ],
            [
                'iso' => 'TRX',
                'name' => 'Tron',
                'coingecko_id' => 'tron',
                'logo' => '/coins/trx.svg',
            ],
            [
                'iso' => 'USD',
                'name' => 'USD',
                'coingecko_id' => 'usd',
                'logo' => '/coins/usd.svg',
            ],
            [
                'iso' => 'EUR',
                'name' => 'EUR',
                'coingecko_id' => 'eur',
                'logo' => '/coins/eur.svg',
            ],
        ]);
    }
}
