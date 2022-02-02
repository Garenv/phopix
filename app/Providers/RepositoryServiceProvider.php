<?php

namespace App\Providers;

use App\Dal\Interfaces\IUploadsRepository;
use App\Dal\Interfaces\IUsersRepository;
use App\Dal\Repositories\UploadsRepository;
use App\Dal\Repositories\UsersRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register() {
        $this->app->bind(IUploadsRepository::class,UploadsRepository::class);
        $this->app->bind(IUsersRepository::class,UsersRepository::class);
    }
}
