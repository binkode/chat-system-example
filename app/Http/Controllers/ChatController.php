<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Myckhel\ChatSystem\Http\Controllers\MessageController;
use Myckhel\ChatSystem\Http\Controllers\ConversationController;
use Myckhel\ChatSystem\Http\Requests\PaginableRequest;

class ChatController extends Controller
{
  function chat(PaginableRequest $request) {
    $request->validate(['conversation_id' => 'int']);

    $data = [];

    if (!$request->hasHeader('X-Inertia-Partial-Data')) {
      $data['conversations'] = (new ConversationController)->index($request);
    }

    $request->whenHas('conversation_id', function ($conversation_id) use(&$data, $request) {
      $data['messages'] = (new MessageController)->index($request);
    });

    return inertia('Chat', $data);
  }
}
