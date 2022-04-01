<?php

namespace App\Dal\Repositories;

use App\Dal\Interfaces\IWinnersRepository;
use Illuminate\Support\Facades\DB;

class WinnersRepository implements IWinnersRepository
{
    public function selectTopThreeWinners()
    {
        return DB::table('uploads')
            ->select('users.name', 'uploads.likes', 'uploads.url')
            ->join('users', 'users.UserID', '=', 'uploads.UserID')
            ->orderBy('likes', 'desc')
            ->limit(3)
            ->get();
    }
}
