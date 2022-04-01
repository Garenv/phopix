<?php

namespace App\Providers;

use App\Dal\Interfaces\IUploadsRepository;
use App\Dal\Interfaces\IUsersRepository;
use App\Dal\Interfaces\IWinnersRepository;
use App\Dal\Repositories\UploadsRepository;
use App\Dal\Repositories\UsersRepository;
use App\Dal\Repositories\WinnersRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register() {
        $this->app->bind(IUploadsRepository::class,UploadsRepository::class);
        $this->app->bind(IUsersRepository::class,UsersRepository::class);
        $this->app->bind(IWinnersRepository::class,WinnersRepository::class);
    }
}
