<?php

namespace App\Console\Commands;

use App\Dal\Interfaces\IWinnersRepository;
use App\Models\LegacyWinners;
use App\Models\Winners;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;

class WeeklyWinners extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'weekly:winners';

    /**
     * @var IWinnersRepository
     */
    protected $__winnersRepository;

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Artisan Command to store weekly winners in winners table and legacy_winners table';

    /**
     * Create a new command instance.
     *
     */
    public function __construct(IWinnersRepository $winnersRepository)
    {
        parent::__construct();
        $this->__winnersRepository = $winnersRepository;
    }

    /**
     * Execute the console command.
     *
     */
    public function handle()
    {
        // Get top three winners by joining uploads and users tables
        $topThreeWinners                 = $this->__winnersRepository->getTopThreeWinnersFromUploadsTable();

        // Get prize data
        $prizesData                      = $this->__winnersRepository->getPrizeData();


        // Get timestamp of the time winner got chosen
        $time                            = Carbon::now();
        $timeStamp                       = $time->toDateTimeString();

        // First place data
        $firstPlaceUserId               = $topThreeWinners[0]->UserID;
        $firstPlaceLikes                = $topThreeWinners[0]->likes;
        $firstPlaceWinnerId             = 'w-' . Str::uuid()->toString();
        $firstPlaceUrl                  = $topThreeWinners[0]->url;
        $firstPlacePrizeId              = $prizesData[0]->prizeId;
        $firstPlaceName                 = $topThreeWinners[0]->name;


        // Second place data
        $secondPlaceUserId              = $topThreeWinners[1]->UserID;
        $secondPlaceLikes               = $topThreeWinners[1]->likes;
        $secondPlaceWinnerId            = 'w-' . Str::uuid()->toString();
        $secondPlaceUrl                 = $topThreeWinners[1]->url;
        $secondPlacePrizeId             = $prizesData[1]->prizeId;
        $secondPlaceName                = $topThreeWinners[1]->name;

        // Third place data
        $thirdPlaceUserId               = $topThreeWinners[2]->UserID;
        $thirdPlaceLikes                = $topThreeWinners[2]->likes;
        $thirdPlaceWinnerId             = 'w-' . Str::uuid()->toString();
        $thirdPlaceUrl                  = $topThreeWinners[2]->url;
        $thirdPlacePrizeId              = $prizesData[2]->prizeId;
        $thirdPlaceName                = $topThreeWinners[2]->name;

        $dataFirstPlace = [
            'UserID'                    => $firstPlaceUserId,
            'place'                     => "1st Place",
            'likes'                     => $firstPlaceLikes,
            'winnerId'                  => $firstPlaceWinnerId,
            'url'                       => $firstPlaceUrl,
            'prizeId'                   => $firstPlacePrizeId,
            'timeStamp'                 => $timeStamp,
            'name'                      => $firstPlaceName
        ];

        $dataSecondPlace = [
            'UserID'                    => $secondPlaceUserId,
            'place'                     => "2nd Place",
            'likes'                     => $secondPlaceLikes,
            'winnerId'                  => $secondPlaceWinnerId,
            'url'                       => $secondPlaceUrl,
            'prizeId'                   => $secondPlacePrizeId,
            'timeStamp'                 => $timeStamp,
            'name'                      => $secondPlaceName
        ];

        $dataThirdPlace = [
            'UserID'                    => $thirdPlaceUserId,
            'place'                     => "3rd Place",
            'likes'                     => $thirdPlaceLikes,
            'winnerId'                  => $thirdPlaceWinnerId,
            'url'                       => $thirdPlaceUrl,
            'prizeId'                   => $thirdPlacePrizeId,
            'timeStamp'                 => $timeStamp,
            'name'                      => $thirdPlaceName
        ];

        // store them in Redis
//        Redis::set("user_data:$firstPlaceUserId", json_encode($dataFirstPlace));

        // store them in winners table
        Winners::create($dataFirstPlace);
        Winners::create($dataSecondPlace);
        Winners::create($dataThirdPlace);

        // store in legacy winners table
        LegacyWinners::create($dataFirstPlace);
        LegacyWinners::create($dataSecondPlace);
        LegacyWinners::create($dataThirdPlace);
    }
}
