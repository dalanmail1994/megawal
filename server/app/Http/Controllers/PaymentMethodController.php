<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;


class PaymentMethodController extends Controller
{
    /**
     * Store a newly created payment method in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        // שלב ראשון – ולידציה בסיסית
        $validated = $request->validate([
            'type' => 'required|in:card,bank',
            'card_number' => 'nullable|string',
            'card_name' => 'nullable|string',
            'expiration_date' => 'nullable|string',
            'cvv' => 'nullable|string',
            'account_number' => 'nullable|string',
            'name' => 'nullable|string',
        ]);

        // שלב שני – ולידציה מותאמת לפי סוג
        if ($validated['type'] === 'card') {
            $request->validate([
                'card_number' => ['required', 'regex:/^\d{16}$/'],
                'card_name' => 'required|string',
                'expiration_date' => ['required', 'regex:/^(0[1-9]|1[0-2])\/\d{2}$/'], // פורמט MM/YY
                'cvv' => ['required', 'regex:/^\d{3}$/'],
            ]);
        }

        if ($validated['type'] === 'bank') {
            $request->validate([
                'name' => 'required|string',
                'account_number' => ['required', 'string'],
            ]);
        }

        $paymentMethod = $user->paymentMethods()->create($validated);

        return response()->json([
            'message' => 'Payment method created successfully',
            'data' => $paymentMethod,
        ], 201);
    }



    public function index(Request $request, User $user = null)
    {
        $authUser = $request->user();

        // אם לא נשלח מזהה משתמש – נשתמש במשתמש המחובר
        $isSelf = false;

        if (!$user) {
            $user = $authUser;
            $isSelf = true;
        } else {
            if (Gate::denies('update', $user)) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $isSelf = false;
        }

        // נביא את שיטות התשלום
        $paymentMethods = $user->paymentMethods()->get();

        // אם זה המידע של המשתמש עצמו – נעשה פילטרים (הסתרת cvv, 4 ספרות בלבד)
        if ($isSelf) {
            $paymentMethods = $paymentMethods->map(function ($pm) {
                return [
                    'id' => $pm->id,
                    'type' => $pm->type,
                    'user_id' => $pm->user_id,
                    'card_number' => $pm->card_number ? substr($pm->card_number, -4) : null,
                    'card_name' => $pm->card_name,
                    'expiration_date' => $pm->expiration_date,
                    'account_number' => $pm->account_number,
                    'name' => $pm->name,
                    'created_at' => $pm->created_at,
                    'updated_at' => $pm->updated_at,
                ];
            });
        }

        return response()->json([
            'data' => $paymentMethods,
        ]);
    }


    /**
     * Remove the specified payment method from storage.
     */
        public function destroy($id, Request $request)
        {
            $authUser = $request->user();

            $paymentMethod = PaymentMethod::findOrFail($id);

            // המשתמש שעליו שייכת שיטת התשלום
            $owner = $paymentMethod->user;

            // נבדוק הרשאה לפי Gate::denies('update', $owner)
            if (Gate::denies('update', $owner)) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $paymentMethod->delete();

            return response()->json([
                'message' => 'Payment method deleted successfully',
            ]);
        }



}
