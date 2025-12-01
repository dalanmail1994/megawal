<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Log;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class LogRequestMiddleware
{
    public function handle(Request $request, Closure $next, $title = null): Response
    {
        $response = $next($request);

        try {
            // ננסה לשלוף את פרמטר {user} מהנתיב
            $toUser = $request->route('user');

            // אם זה אובייקט User – ניקח את ה-ID שלו
            if (is_object($toUser) && method_exists($toUser, 'getKey')) {
                $toUser = $toUser->getKey();
            }

            // אם אין – נגדיר כ־null
            if (!is_numeric($toUser)) {
                $toUser = null;
            }

            Log::create([
                'user_id'  => Auth::id(),
                'to_user'  => $toUser,
                'method'   => $request->method(),
                'path'     => $request->path(),
                'title'    => $title,
                'payload'  => json_encode($request->except(['password', 'token'])),
            ]);
        } catch (\Throwable $e) {
            // אפשר לרשום ל-log רגיל אם רוצים
        }

        return $response;
    }
}
