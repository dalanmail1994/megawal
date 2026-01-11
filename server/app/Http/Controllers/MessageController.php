<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ticket_id' => 'required|exists:tickets,id',
            'content'   => 'required|string',
            'is_admin'  => 'required|boolean'
        ]);

        $user = $request->user();
        if ($user->user_type_id == 4 && $validated['is_admin']) {
            $validated['is_admin'] = false;
        }

        $message = Message::create([
            'ticket_id' => $validated['ticket_id'],
            'from' => $request->user()->id,
            'content' => $validated['content'],
            'is_admin' => $validated['is_admin'],
        ]);

        return response()->json($message, 201);
    }

    public function index(Request $request, $ticketId)
    {
        $user = $request->user();
        $isAdmin = $user->user_type_id < 4;

        if ($isAdmin) {
            Message::where('ticket_id', $ticketId)
                ->where('is_admin', false)
                ->whereNull('read_by_admin_at')
                ->update(['read_by_admin_at' => now()]);
        } else {
            Message::where('ticket_id', $ticketId)
                ->where('is_admin', true)
                ->whereNull('read_by_user_at')
                ->update(['read_by_user_at' => now()]);
        }

        return Message::where('ticket_id', $ticketId)
            ->with('sender')
            ->orderBy('created_at')
            ->get();
    }
}
