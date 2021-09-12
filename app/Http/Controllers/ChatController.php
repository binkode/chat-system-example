<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatController extends Controller
{
  function chat(Request $request) {
    return inertia('Chat', []);
  }
}
