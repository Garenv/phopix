<?php

namespace App\Console\Commands;

use App\Dal\Interfaces\IWinnersRepository;
use App\Models\LegacyWinners;
use App\Models\Winners;
use Illuminate\Console\Command;
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

        // First place data
        $firstPlaceUserId                = $topThreeWinners[0]->UserID;
        $firstPlaceEmail                 = $topThreeWinners[0]->email;
        $firstPlaceLikes                 = $topThreeWinners[0]->likes;
        $firstPlaceWinnerId              = 'w-' . Str::uuid()->toString();
        $firstPlaceUrl                   = $topThreeWinners[0]->url;
        $firstPlacePrizeId               = $prizesData[0]->prizeId;

        // Second place data
        $secondPlaceUserId              = $topThreeWinners[1]->UserID;
        $secondPlaceEmail               = $topThreeWinners[1]->email;
        $secondPlaceLikes               = $topThreeWinners[1]->likes;
        $secondPlaceWinnerId            = 'w-' . Str::uuid()->toString();
        $secondPlaceUrl                 = $topThreeWinners[1]->url;
        $secondPlacePrizeId             = $prizesData[1]->prizeId;

        // Third place data
        $thirdPlaceUserId               = $topThreeWinners[2]->UserID;
        $thirdPlaceEmail                = $topThreeWinners[2]->email;
        $thirdPlaceLikes                = $topThreeWinners[2]->likes;
        $thirdPlaceWinnerId             = 'w-' . Str::uuid()->toString();
        $thirdPlaceUrl                  = $topThreeWinners[2]->url;
        $thirdPlacePrizeId              = $prizesData[2]->prizeId;

        $dataFirstPlace = [
            'UserID'                    => $firstPlaceUserId,
            'email'                     => $firstPlaceEmail,
            'place'                     => "1",
            'likes'                     => $firstPlaceLikes,
            'winnerId'                  => $firstPlaceWinnerId,
            'url'                       => $firstPlaceUrl,
            'prizeId'                   => $firstPlacePrizeId
        ];

        $dataSecondPlace = [
            'UserID'                    => $secondPlaceUserId,
            'email'                     => $secondPlaceEmail,
            'place'                     => "2",
            'likes'                     => $secondPlaceLikes,
            'winnerId'                  => $secondPlaceWinnerId,
            'url'                       => $secondPlaceUrl,
            'prizeId'                   => $secondPlacePrizeId
        ];

        $dataThirdPlace = [
            'UserID'                    => $thirdPlaceUserId,
            'email'                     => $thirdPlaceEmail,
            'place'                     => "3",
            'likes'                     => $thirdPlaceLikes,
            'winnerId'                  => $thirdPlaceWinnerId,
            'url'                       => $thirdPlaceUrl,
            'prizeId'                   => $thirdPlacePrizeId
        ];

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
