<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function update(User $editor, User $target): bool
    {
        // משתמש מסוג 1 (Admin) יכול לערוך הכל
        if ($editor->user_type_id === 1) {
            return true;
        }

        // // משתמש לא יכול לערוך מישהו אחר אם הם לא באותו משרד
        // if ($editor->office_id !== $target->office_id && $editor->id !== $target->id) {
        //     return false;
        // }

        // סוג 3 יכול לערוך רק את עצמו
        if ($editor->user_type_id === 3) {
            return $editor->id === $target->id;
        }

        // סוג 2 יכול לערוך את עצמו או משתמש מסוג 3
        if ($editor->user_type_id === 2) {
            if ($editor->id === $target->id) {
                return true;
            }
            return $target->user_type_id === 3;
        }

        return false;
    }
}
