<?php

namespace App\Observers;
use Myckhel\ChatSystem\Observers\ConversationObserver as BaseConversationObserver;
use Myckhel\ChatSystem\Models\Conversation;

class ConversationObserver extends BaseConversationObserver
{
  /**
   * Handle the conversation "created" event.
   *
   * @param  \Myckhel\ChatSystem\Models\Conversation  $conversation
   * @return void
   */
  public function created(Conversation $conversation)
  {
    $messages = $conversation->messages()->createMany([
      [
        'user_id' => $conversation->user_id,
        'message' => trans('msg.chat.system.safety'),
        'type' => 'system'
      ],
      [
        'user_id' => $conversation->user_id,
        'message' => trans('msg.chat.system.msg_desc'),
        'type' => 'system'
      ],
    ]);
  }
}
