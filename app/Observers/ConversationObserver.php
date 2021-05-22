<?php

namespace App\Observers;
use Myckhel\ChatSystem\Observers\ConversationObserver as BaseConversationObserver;
use Myckhel\ChatSystem\Models\Conversation;
use Myckhel\ChatSystem\Models\Meta;
use ChatSystem;

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
      ['user_id' => $conversation->user_id, 'message' => trans('msg.chat.system.safety')],
      ['user_id' => $conversation->user_id, 'message' => trans('msg.chat.system.msg_desc')],
    ]);

    // Meta::createMany([
    //   [
    //     'metable_id' => $messages[0]->id,
    //     'metable_type' => $messages[0]::class,
    //     'name' => 'system',
    //     'value' => true
    //   ],
    //   [
    //     'metable_id' => $messages[1]->id,
    //     'metable_type' => $messages[1]::class,
    //     'name' => 'system',
    //     'value' => true
    //   ],
    // ]);
    ChatSystem::async(
      fn () => $messages[0]->metas()->create([
        'name' => 'system',
        'value' => true
      ]),
      fn () => $messages[1]->metas()->create([
        'name' => 'system',
        'value' => true
      ]),
    );
   // $conversation->participants()->create([
     // 'user_id' => $conversation->author->id
   // ]);
  }
}
