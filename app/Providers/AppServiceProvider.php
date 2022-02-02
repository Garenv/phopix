<?php

namespace App\Providers;

use App\Dal\Interfaces\IUploadsRepository;
use App\Dal\Interfaces\IUsersRepository;
use App\Dal\Repositories\UploadsRepository;
use App\Dal\Repositories\UsersRepository;
use Illuminate\Support\ServiceProvider;
use Prettus\Repository\Providers\RepositoryServiceProvider;

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
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
