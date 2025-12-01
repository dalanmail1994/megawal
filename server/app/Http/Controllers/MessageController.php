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

    public function index($ticketId)
    {
        return Message::where('ticket_id', $ticketId)->with('sender')->get();
    }
}
