<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\Message;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'priority'=> 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $ticket = Ticket::create([
            'subject' => $validated['subject'],
            'created_by' => $request->user()->id,
        ]);

        Message::create([
            'ticket_id' => $ticket->id,
            'from' => $request->user()->id,
            'content' => $validated['message'],
            'is_admin' => false,
        ]);

        return response()->json($ticket, 201);
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $getAll = $request->boolean('all');
        $userid = $request->input('userid');
        $isAdmin = $user->user_type_id < 4;

        $ticketsQuery = Ticket::with('creator')
            ->withCount([
                'messages as unread_count' => function ($query) use ($isAdmin) {
                    if ($isAdmin) {
                        $query->where('is_admin', false)
                              ->whereNull('read_by_admin_at');
                        return;
                    }
                    $query->where('is_admin', true)
                          ->whereNull('read_by_user_at');
                }
            ]);

        if ($isAdmin && $getAll) {
            if (!empty($userid)) {
                return $ticketsQuery->where('created_by', $userid)->get();
            }
            return $ticketsQuery->get();
        }
        return $ticketsQuery->where('created_by', $user->id)->get();
    }

}

