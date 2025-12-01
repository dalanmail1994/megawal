<?php

namespace App\Http\Controllers;

use App\Models\Kyc;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Gate;


class KycController extends Controller
{
    public function upload(Request $request)
    {
        $user = $request->user();

        $documentFields = ['passport', 'address_proof', 'selfie'];
        $saved = [];

        foreach ($documentFields as $field) {
            $file = $request->file($field);

            if ($file && $file->isValid()) {
                $allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
                if (!in_array($file->getMimeType(), $allowedTypes)) {
                    return response()->json(['message' => "Invalid file type for {$field}"], 422);
                }

                $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs("private/kyc/{$user->id}", $filename);

                $kyc = Kyc::create([
                    'user_id' => $user->id,
                    'status' => 'pending',
                    'path' => $path,
                    'document_type' => $field,
                ]);

                $saved[] = $kyc;
            }
        }

        if (empty($saved)) {
            return response()->json(['message' => 'No files were uploaded'], 400);
        }

        return response()->json([
            'message' => 'Files uploaded successfully',
            'uploaded' => $saved,
        ]);
    }



    public function getUserDocuments(Request $request, $userId)
    {
        $authUser = $request->user();
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if (!Gate::allows('update', $user)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $documents = Kyc::where('user_id', $userId)->get();

        if ($documents->isEmpty()) {
            return response()->json([
                'message' => 'No documents found for this user.',
                'documents' => $documents,
            ]);
        }

        // נוסיף שדה 'base64' לכל מסמך
        $documents = $documents->map(function ($doc) {
            if (Storage::exists($doc->path)) {
                $contents = Storage::get($doc->path);
                $mime = Storage::mimeType($doc->path);
                $base64 = 'data:' . $mime . ';base64,' . base64_encode($contents);
                $doc->base64 = $base64;
            } else {
                $doc->base64 = null;
            }

            return $doc;
        });

        return response()->json([
            'documents' => $documents,
        ]);
    }



    public function updateStatus(Request $request, Kyc $kyc)
    {
        $user = $request->user();

        if (!Gate::allows('update', $kyc->user)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'status' => 'required|string|in:pending,completed,failed',
        ]);
        $kyc->status = $validated['status'];
        $kyc->save();

        return response()->json([
            'message' => 'Status updated successfully',
            'kyc' => $kyc,
        ]);
    }

}
