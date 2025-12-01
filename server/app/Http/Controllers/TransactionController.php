<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class TransactionController extends Controller
{
    // יצירת טרנזקציה חדשה
    public function store(Request $request)
    {
        $validated = $request->validate([
            'amount'              => 'required|numeric',
            'mod'                 => 'required|boolean',
            'from_public_address' => 'nullable|string',
            'to_public_address'   => 'nullable|string',
            'transaction_hash'    => 'required|string',
            'status'              => 'required|string',
            'date'                => 'required|date',
            'descreption'         => 'nullable|string',
            'user_id'             => 'required|exists:users,id',
            'currency_iso'        => 'required|exists:currencies,iso',
        ]);

        $creator = $request->user();
        $targetUser = User::findOrFail($validated['user_id']);

        if (Gate::denies('update', $targetUser)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $transaction = Transaction::create([
            ...$validated,
            'created_by' => $creator->id,
        ]);

        return response()->json([
            'message'     => 'Transaction created successfully',
            'transaction' => $transaction,
        ], 201);
    }



    public function update(Request $request, Transaction $transaction)
    {
        $validated = $request->validate([
            'amount'              => 'sometimes|required|numeric',
            'mod'                 => 'sometimes|required|boolean',
            'from_public_address' => 'nullable|string',
            'to_public_address'   => 'nullable|string',
            'transaction_hash'    => 'sometimes|required|string',
            'status'              => 'sometimes|required|string',
            'date'                => 'sometimes|required|date',
            'descreption'         => 'nullable|string',
            'currency_iso'        => 'sometimes|required|exists:currencies,iso',
        ]);

        $creator = $request->user();

        // בדיקת הרשאה לפי המשתמש שאליו שייכת הטרנזקציה
        if (Gate::denies('update', $transaction->user)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $transaction->update([
            ...$validated,
        ]);

        return response()->json([
            'message'     => 'Transaction updated successfully',
            'transaction' => $transaction,
        ]);
    }


    public function destroy(Transaction $transaction)
    {
        $currentUser = request()->user();

        // בדיקת הרשאה על המשתמש שאליו שייכת הטרנזקציה
        if (Gate::denies('update', $transaction->user)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $transaction->delete();

        return response()->json([
            'message' => 'Transaction deleted successfully',
        ]);
    }

    // public function index(Request $request)
    // {
    //     $authUser = $request->user();
    //     $userId = $request->query('user_id');
    //     $all = $request->boolean('all');

    //     // ✅ בקשת הכל – מחזיר את כל הטרנזקציות שמותר לו לראות
    //     if ($all) {
    //         $visibleUserIds = User::get()
    //             ->filter(fn($targetUser) => Gate::allows('update', $targetUser))
    //             ->pluck('id');

    //         $transactions = Transaction::with(['creator', 'user', 'currency'])
    //             ->whereIn('user_id', $visibleUserIds)
    //             ->latest()
    //             ->get();

    //         return response()->json($transactions);
    //     }

    //     // ✅ בקשה עבור משתמש מסוים
    //     if ($userId) {
    //         $targetUser = User::findOrFail($userId);

    //         if (Gate::denies('update', $targetUser)) {
    //             return response()->json(['message' => 'Unauthorized'], 403);
    //         }

    //         $user = $targetUser;
    //         $with = ['creator', 'user', 'currency'];
    //     } else {
    //         $user = $authUser;
    //         $with = ['user', 'currency']; // ❌ ללא creator
    //     }

    //     $transactions = Transaction::with($with)
    //         ->where('user_id', $user->id)
    //         ->latest()
    //         ->get();

    //     return response()->json($transactions);
    // }

    public function index(Request $request)
    {
        $authUser = $request->user();
        $userId = $request->query('user_id');
        $all = $request->boolean('all');
        $perPage = 10;

        // ✅ בקשת הכל – מחזיר את כל הטרנזקציות שמותר לו לראות
        if ($all) {
            $visibleUserIds = User::get()
                ->filter(fn($targetUser) => Gate::allows('update', $targetUser))
                ->pluck('id');

            $transactions = Transaction::with(['creator', 'user', 'currency'])
                ->whereIn('user_id', $visibleUserIds)
                ->latest()
                ->paginate($perPage);

            return response()->json($transactions);
        }

        // ✅ בקשה עבור משתמש מסוים
        if ($userId) {
            $targetUser = User::findOrFail($userId);

            if (Gate::denies('update', $targetUser)) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $user = $targetUser;
            $with = ['creator', 'user', 'currency'];
        } else {
            $user = $authUser;
            $with = ['user', 'currency']; // ❌ ללא creator
        }

        $transactions = Transaction::with($with)
            ->where('user_id', $user->id)
            ->latest()
            ->paginate($perPage);

        return response()->json($transactions);
    }


}
