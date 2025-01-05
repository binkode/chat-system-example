<?php

namespace App\Observers;

use Binkode\ChatSystem\Observers\ConversationObserver as BaseConversationObserver;
use Binkode\ChatSystem\Contracts\IConversation;

class ConversationObserver extends BaseConversationObserver
{
  /**
   * Handle the conversation "created" event.
   *
   * @param  \Binkode\ChatSystem\Contracts\IConversation  $conversation
   * @return void
   */
  public function created(IConversation $conversation)
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
