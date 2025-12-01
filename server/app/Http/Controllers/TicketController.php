<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'priority'=> 'required|string|max:255',
        ]);

        $ticket = Ticket::create([
            'subject' => $validated['subject'],
            'created_by' => $request->user()->id,
        ]);

        return response()->json($ticket, 201);
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $getAll = $request->boolean('all');
        $userid = $request->input('userid');

        if ($user->user_type_id < 4 && $getAll) {
            if (!empty($userid)) {
                return Ticket::where('created_by', $userid)
                            ->with('creator')
                            ->get();
            }
            return Ticket::with('creator')->get();
        }
        return Ticket::where('created_by', $user->id)
                    ->with('creator')
                    ->get();
    }

}


