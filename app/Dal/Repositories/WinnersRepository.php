<?php

namespace App\Dal\Repositories;

use App\Dal\Interfaces\IWinnersRepository;
use Illuminate\Support\Facades\DB;

class WinnersRepository implements IWinnersRepository
{
    public function getTopThreeWinnersFromUploadsTable()
    {
        return DB::table('uploads')
            ->select('users.name', 'uploads.likes', 'uploads.url', 'uploads.UserID', 'users.email')
            ->join('users', 'users.UserID', '=', 'uploads.UserID')
            ->orderBy('likes', 'desc')
            ->limit(3)
            ->get();
    }

    public function getTopThreeWinnersFromWinnersTable()
    {
        return DB::table('winners')
            ->select('users.name', 'winners.likes', 'winners.url')
            ->join('users', 'users.UserID', '=', 'winners.UserID')
            ->orderBy('likes', 'desc')
            ->get();
    }

    public function getPrizeData()
    {
        return DB::table('prizes')->get();
    }

    public function insertFirstPlace()
    {

    }

    public function insertSecondPlace()
    {

    }

    public function insertShirdPlace()
    {

    }


}
