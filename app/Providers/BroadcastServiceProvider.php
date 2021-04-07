<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;
use ChatSystem;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Broadcast::routes(['middleware' => ['auth:sanctum'], 'prefix' => 'api']);
        ChatSystem::registerBroadcastRoutes();

        require base_path('routes/channels.php');
    }
}
