<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\WalletToUser;
use App\Models\Transaction;
use App\Models\Currency;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name'    => 'required|string|max:255',
            'last_name'     => 'required|string|max:255',
            'email'         => 'required|email|unique:users,email',
            'password'      => 'required|string|min:6',
        ]);
    
        $user = User::create([
            'first_name'    => $validated['first_name'],
            'last_name'     => $validated['last_name'],
            'email'         => $validated['email'],
            'password'      => Hash::make($validated['password']),
            'user_type_id'  => 3,
            'last_login'    => now(),
            'last_ip'       => $request->ip(),
        ]);
    
        $token = $user->createToken('api-token')->plainTextToken;
    
        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 201);
    }

    public function index(Request $request)
    {
        $search = $request->input('search');
        $usersQuery = User::query();

        if (!empty($search)) {
            $usersQuery->where(function ($query) use ($search) {
                $query->where('email', 'like', '%' . $search . '%')
                    ->orWhere('first_name', 'like', '%' . $search . '%')
                    ->orWhere('last_name', 'like', '%' . $search . '%');
            });
        }

        $users = $usersQuery->get();
        return response()->json($users);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();

        $user->last_login = now();
        $user->last_ip = $request->ip();
        $user->save();

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ]);
    }


    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }


    
    public function update(Request $request, User $user)
    {
        if ($request->user()->cannot('update', $user)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'first_name'        => 'sometimes|required|string|max:255',
            'last_name'         => 'sometimes|required|string|max:255',
            'email'             => 'sometimes|required|email|unique:users,email,' . $user->id,
            'password'          => 'sometimes|nullable|string|min:6',
            'user_type_id'      => 'sometimes|integer|exists:user_type,id',
            'office_id'         => 'sometimes|integer|exists:offices,id',
            'is_ban'            => 'sometimes|required|boolean',
            'main_coin_id'      => 'sometimes|required|integer',
            'iso'               => 'sometimes|nullable|string|max:2',
            
            'is_send_crypto'    => 'sometimes|required|boolean',
            'is_swap_crypto'    => 'sometimes|required|boolean',
            'is_buy_crypto'     => 'sometimes|required|boolean',
            'is_sell_crypto'    => 'sometimes|required|boolean',
            'is_stake_crypto'   => 'sometimes|required|boolean',

            'email_on_account_change'      => 'sometimes|required|boolean',
            'email_on_kyc_update'          => 'sometimes|required|boolean',
            'email_on_login_attempt'       => 'sometimes|required|boolean',
            'email_on_payment_notification'=> 'sometimes|required|boolean',
            'email_crypto_news'            => 'sometimes|required|boolean',
            'email_on_tx_sent'             => 'sometimes|required|boolean',
            'email_on_tx_received'         => 'sometimes|required|boolean',
            'email_on_stake_rewards'       => 'sometimes|required|boolean',
        ]);


        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $isSelfUpdate = $request->user()->id === $user->id;

        if ($isSelfUpdate) {
            unset($validated['user_type_id'], $validated['office_id'], $validated['is_ban']);
        }

        // 🧍 עדכון המשתמש
        $userData = collect($validated)->only([
            'first_name', 'last_name', 'email', 'password',
            'user_type_id', 'office_id', 'is_ban', 'main_coin_id', 'iso'
        ])->toArray();

        $user->update($userData);

        // 🔒 עדכון ההרשאות
        $permissionsData = collect($validated)->only([
            'email_on_account_change',
            'email_on_kyc_update',
            'email_on_login_attempt',
            'email_on_payment_notification',
            'email_crypto_news',
            'email_on_tx_sent',
            'email_on_tx_received',
            'email_on_stake_rewards',

            'is_send_crypto',
            'is_swap_crypto',
            'is_buy_crypto',
            'is_sell_crypto',
            'is_stake_crypto',
        ])->toArray();

        if (!empty($permissionsData)) {
            $user->permissions()->update($permissionsData);
        }

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user->fresh()->load(['mainCoin', 'permissions'])
        ]);

    }




    public function updateWallet(Request $request, User $user)
    {
        $validated = $request->validate([
            'currency_iso' => 'required|exists:currencies,iso',
            'public_key'   => 'required|string|max:255',
        ]);

        $editor = $request->user();

        // בדיקת הרשאות - משתמש שמנסה לעדכן את הארנק של $user
        if (!Gate::allows('update', $user)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // עדכון או יצירה של הארנק
        $wallet = WalletToUser::updateOrCreate(
            [
                'user_id' => $user->id,
                'currency_iso' => $validated['currency_iso'],
            ],
            [
                'public_key' => $validated['public_key'],
            ]
        );

        return response()->json([
            'message' => 'Wallet saved successfully',
            'wallet'  => $wallet,
        ]);
    }




    public function show(Request $request, User $user = null)
    {
        $currentUser = $request->user();

        // אם נשלח user ב-URL, נבדוק הרשאות
        if ($user && $user->id !== $currentUser->id) {
            if (Gate::denies('update', $user)) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            $user = User::with(['mainCoin', 'permissions'])->findOrFail($user->id);
        } else {
            $user = User::with(['mainCoin', 'permissions'])->findOrFail($currentUser->id);
        }

        // נשלוף את כל הטרנזקציות של המשתמש עם המטבע שלהן
        $transactions = Transaction::with('currency')
            ->where('user_id', $user->id)
            ->get();

        $balances = [];

        foreach ($transactions as $tran) {
            if ($tran->status === 'failed') continue;

            $iso = strtoupper($tran->currency_iso);
            $amount = $tran->mod ? $tran->amount : -$tran->amount;

            if (!isset($balances[$iso])) {
                $balances[$iso] = [
                    'amount' => 0,
                    'name' => $tran->currency->name ?? $iso,
                    'logo' => $tran->currency->logo ?? null,
                ];
            }

            $balances[$iso]['amount'] += $amount;
        }

        // נמיר לשמות של coingecko id
        $ids = implode(',', array_map(fn($iso) => strtolower($balances[$iso]['name']), array_keys($balances)));

        $vsCurrency = $user->mainCoin?->name ?? 'usd';

        $rates = [];
        if (!empty($ids)) {
            $response = Http::get('https://api.coingecko.com/api/v3/simple/price', [
                'ids' => $ids,
                'vs_currencies' => $vsCurrency,
            ]);

            $rates = $response->json();
        }

        $totalUsd = 0;

        foreach ($balances as $iso => &$entry) {
            $cgId = strtolower($entry['name']);
            $rate = $rates[$cgId][$vsCurrency] ?? 0;
            $entry['usd_rate'] = $rate;
            $entry['usd_value'] = round($entry['amount'] * $rate, 2);
            $totalUsd += $entry['usd_value'];
        }
        unset($entry);

        $userArray = $user->toArray();
        $userArray['balance'] = round($totalUsd, 2);
        $userArray['balances'] = $balances;

        return response()->json($userArray);
    }


    public function resetPassword(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'current_password' => ['required', 'string'],
            'new_password' => ['required', 'string', 'min:6', 'confirmed'],
            // הערך 'confirmed' דורש קיום של שדה בשם new_password_confirmation
        ]);

        // בדיקה שהסיסמה הנוכחית נכונה
        if (!Hash::check($validated['current_password'], $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The current password is incorrect.'],
            ]);
        }

        // עדכון הסיסמה
        $user->update([
            'password' => Hash::make($validated['new_password']),
        ]);

        return response()->json([
            'message' => 'Password updated successfully.',
        ]);
    }

    public function updateSupportName(Request $request)
    {
        $user = $request->user();
        if ($user->user_type_id >= 3) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'support_name' => 'required|string|max:255',
        ]);

        $user->update([
            'support_name' => $validated['support_name'],
        ]);

        return response()->json([
            'message' => 'Support name updated',
            'support_name' => $user->support_name,
        ]);
    }




    public function verifyDocuments(Request $request, User $user)
    {
        // בדיקת הרשאה
        if ($request->user()->id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // בדיקת קיום קובץ
        if (!$request->hasFile('file')) {
            return response()->json(['message' => 'No file uploaded'], 400);
        }

        $file = $request->file('file');

        // בדיקת סוגי קבצים מותרים
        $allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!in_array($file->getMimeType(), $allowedTypes)) {
            return response()->json(['message' => 'Invalid file type'], 422);
        }

        // שם קובץ ייחודי
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();

        // שמירה לתיקיה מאובטחת (storage/app/private/user-documents/)
        $path = $file->storeAs('private/user-documents/' . $user->id, $filename);

        // אם תרצה לשמור במסד את הנתיב
        // $user->document_path = $path;
        // $user->save();

        return response()->json(['message' => 'File uploaded successfully', 'path' => $path]);
    }


    public function downloadDocument(Request $request, User $user)
    {
        if ($request->user()->id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // נניח שמסמך בודד, או שאתה שומר את הנתיב במסד
        $files = Storage::files('private/user-documents/' . $user->id);
        if (empty($files)) {
            return response()->json(['message' => 'No file found'], 404);
        }

        return Storage::download($files[0]); // אם יש רק קובץ אחד
    }


}
