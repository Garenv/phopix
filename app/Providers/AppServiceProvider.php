<?php

namespace App\Providers;

use App\Dal\Interfaces\IUploadsRepository;
use App\Dal\Interfaces\IUsersRepository;
use App\Dal\Interfaces\IWinnersRepository;
use App\Dal\Repositories\UploadsRepository;
use App\Dal\Repositories\UsersRepository;
use App\Dal\Repositories\WinnersRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment('local')) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
            $this->app->bind(IUploadsRepository::class,UploadsRepository::class);
            $this->app->bind(IUsersRepository::class,UsersRepository::class);
            $this->app->bind(IWinnersRepository::class,WinnersRepository::class);
        }

        if (env('APP_ENV') != 'local') {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if($this->app->environment('production')) {
            $this->app['request']->server->set('HTTPS','on');
        }
    }
}
