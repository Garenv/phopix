<?php

namespace App\Providers;

use App\Dal\Interfaces\IUploadsRepository;
use App\Dal\Repositories\UploadsRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register() {
        $this->app->bind(IUploadsRepository::class,UploadsRepository::class);
    }
}
