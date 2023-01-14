<?php

namespace App\Dal\Repositories;

use App\Dal\Interfaces\IWinnersRepository;
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
        // See https://stackoverflow.com/a/54619338 for reference
        return DB::table('uploads')
            ->select('users.name', 'uploads.likes', 'uploads.url', 'uploads.UserID', 'users.email', 'uploads.timestamp')
            ->join('users', 'users.UserID', '=', 'uploads.UserID')
            ->whereRaw("`uploads`.`timeStamp` >= curdate() - INTERVAL DAYOFWEEK(curdate()) +6 DAY and `uploads`.`timeStamp` < curdate() - INTERVAL DAYOFWEEK(curdate()) -1 DAY")
            ->orderBy('likes', 'desc')
            ->limit(3)
            ->get();
    }

    public function getTopThreeWinnersFromWinnersTable()
    {
        return DB::table('winners')
            ->select('users.name', 'winners.likes', 'winners.url', 'winners.place')
            ->join('users', 'users.UserID', '=', 'winners.UserID')
            ->orderBy('likes', 'desc')
            ->limit(3)
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
