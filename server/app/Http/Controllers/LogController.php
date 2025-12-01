<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class LogController extends Controller
{
    /**
     * החזרת כל הלוגים של משתמש מסוים – גם שהוא יצר וגם שנעשו עליו
     */
    public function index(Request $request, $userId)
    {
        $authUser = $request->user();
        $targetUser = User::findOrFail($userId);

        // בדיקת הרשאות
        if (Gate::denies('update', $targetUser)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // החזרת לוגים לפי user_id או to_user
        $logs = Log::with(['user', 'targetUser'])
            ->where('user_id', $targetUser->id)
            ->orWhere('to_user', $targetUser->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $logs,
        ]);
    }
}
