<?php

return [
  "models" => [
    "user"          => "App\\Models\\User",
    "conversation"  => "App\\Models\\Conversation",
    "conversation_user"  => "Myckhel\\ChatSystem\\Models\\ConversationUser",
    "message"       => "App\\Models\\Message",
    "chat_event"    => "App\\Models\\ChatEvent",
    "meta"          => "App\\Models\\Meta",
  ],
  "route" => [
    "middlewares" => ['auth:sanctum', 'api'],
    "prefix" => 'api'
  ],

  /*
  * Model Observers
  */
  "observers"         => [
    "models"          => [
      "chat_event"    => 'Myckhel\\ChatSystem\\Observers\\ChatEventObserver',
      "conversation"  => 'App\\Observers\\ConversationObserver',
    ]
  ]
];
