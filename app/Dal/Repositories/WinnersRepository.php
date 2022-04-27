<?php

namespace App\Dal\Repositories;

use App\Dal\Interfaces\IWinnersRepository;
use App\Models\LegacyWinners;
use App\Models\Prizes;
use Illuminate\Support\Facades\DB;

class WinnersRepository implements IWinnersRepository
{

    public function getPrizeData()
    {
        return Prizes::all();
    }

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

    public function getAllWinnersFromLegacyWinnersTable()
    {
        return DB::table('legacy_winners')
            ->select('legacy_winners.UserID', 'legacy_winners.likes', 'legacy_winners.place', 'legacy_winners.name', 'legacy_winners.url', 'prizes.prizeName')
            ->join('prizes', 'legacy_winners.prizeId', '=', 'prizes.prizeId')
            ->get();
    }

}
