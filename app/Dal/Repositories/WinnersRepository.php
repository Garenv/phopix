<?php

namespace App\Dal\Repositories;

use App\Dal\Interfaces\IWinnersRepository;
use App\Models\Prizes;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class WinnersRepository implements IWinnersRepository
{

    public function getPrizeData()
    {
        return Prizes::all();
    }

    public function getTopThreeWinnersFromUploadsTable()
    {
        $wednesdayThisWeek = Carbon::now()->startOfWeek()->addDays(3); // This gets the date for Wednesday this week.
        $wednesdayNextWeek = $wednesdayThisWeek->copy()->addWeek()->subSecond(); // This gets the date for Wednesday next week.

        return DB::table('uploads')
            ->select('users.name', 'uploads.likes', 'uploads.url', 'uploads.UserID', 'users.email', 'uploads.timestamp')
            ->join('users', 'users.UserID', '=', 'uploads.UserID')
//            ->whereBetween('uploads.timestamp', [$wednesdayThisWeek, $wednesdayNextWeek])
            ->orderBy('uploads.likes', 'desc')
            ->limit(3)
            ->get();
    }

    public function getTopThreeWinnersFromWinnersTable()
    {
        return DB::table('winners')
            ->select('users.name', 'winners.likes', 'winners.url', 'winners.place', 'users.UserID')
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
