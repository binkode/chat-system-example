<?php

namespace App\Service;

use Laravel\Octane\Swoole\Socket\WebSocketService as BaseWebSocketService;
use Swoole\Http\Request;
use Swoole\WebSocket\Frame;

/**
 * @see https://www.swoole.co.uk/docs/modules/swoole-websocket-server
 */
class WebSocketService extends BaseWebSocketService
{
  public function onOpen(Request $request)
  {
    $this->server->push($request->fd, 'Welcome to Laravel Octane WS App');
  }

  public function onMessage(Frame $frame)
  {
    $this->server->push($frame->fd, date('Y-m-d H:i:s'));
  }

  public function onClose($fd, $reactorId)
  {
    echo 'Socket closed id:' . $fd . ' reactorId:' . $reactorId;
  }
}
