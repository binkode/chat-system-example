<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use ChatSystem;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
      ChatSystem::registerObservers();
    }
}
