<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;



class CurrencyController extends Controller
{

    public function index(Request $request, User $user = null)
    {
        $currentUser = Auth::user();

        // נבחר את המשתמש הסופי עם הקשר mainCoin
        if ($user && $user->id !== $currentUser->id) {
            if (Gate::denies('update', $user)) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            $final_user = User::with('mainCoin')->findOrFail($user->id);
        } else {
            $final_user = User::with('mainCoin')->findOrFail($currentUser->id);
        }

        $userId = $final_user->id;

        $currencies = Currency::with(['wallet' => function($q) use ($userId) {
            $q->where('user_id', $userId);
        }])->get();

        $ids = $currencies->pluck('coingecko_id')->filter()->implode(',');

        $vsCurrency = $final_user->mainCoin?->name ?? 'usd';

        $rates = [];

        try {
            $response = Http::get('https://api.coingecko.com/api/v3/simple/price', [
                'ids' => $ids,
                'vs_currencies' => $vsCurrency,
            ]);

            if ($response->successful()) {
                $rates = $response->json();
            }
        } catch (\Exception $e) {
            // תיעוד או טיפול בשגיאה אם צריך
        }

        $currencies->transform(function ($currency) use ($rates, $vsCurrency) {
            $id = $currency->coingecko_id;
            $currency->usd_rate = $rates[$id][$vsCurrency] ?? 0;
            return $currency;
        });

        return response()->json($currencies);
    }

}
