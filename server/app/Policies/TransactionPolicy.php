<?php

namespace App\Policies;

use App\Models\Transaction;
use App\Models\User;

class TransactionPolicy
{
    /**
     * בדיקה האם המשתמש יכול לעדכן את הטרנזקציה
     */
    public function update(User $editor, Transaction $transaction): bool
    {
        $target = $transaction->user;

        // משתמש מסוג 1 (God) יכול לערוך הכל
        if ($editor->user_type_id === 1) {
            return true;
        }

        // אם אינם באותו משרד - חסום
        if ($editor->office_id !== $target->office_id) {
            return false;
        }

        
        // סוגים 2 ו־3 יכולים:
        if (in_array($editor->user_type_id, [2, 3])) {
            return
                $editor->id === $target->id ||             // לערוך את עצמם
                $target->user_type_id === 4;               // או משתמש מסוג 4
        }

        // סוג 4 לא יכול לערוך בכלל
        return false;
    }

    /**
     * קריאה בלבד – כל משתמש יכול לצפות בטרנזקציה שלו
     */
    public function view(User $user, Transaction $transaction): bool
    {
        if ($user->user_type_id === 1) {
            return true;
        }

        if ($user->office_id !== $target->office_id) {
            return false;
        }

        if (in_array($user->user_type_id, [2, 3])) {
            return
                $target->user_type_id === 4;
        }

        return $user->id === $transaction->user_id;
    }
}
