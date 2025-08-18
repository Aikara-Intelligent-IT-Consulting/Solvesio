<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string'
        ]);

        // Simpan ke database atau kirim email
        // Contact::create($validated);

        return response()->json(['success' => true, 'message' => 'Thank you!']);
    }
}
