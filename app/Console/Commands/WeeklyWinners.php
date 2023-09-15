<?php

namespace App\Console\Commands;

use App\Dal\Interfaces\IWinnersRepository;
use App\Models\LegacyWinners;
use App\Models\Uploads;
use App\Models\Winners;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Traits\MailgunTrait;

class WeeklyWinners extends Command
{

    use MailgunTrait;

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
        $this->__winnersRepository      = $winnersRepository;
    }

    /**
     * Execute the console command.
     *
     */
    public function handle()
    {
        try {
            // Get top three winners by joining uploads and users tables
            $topThreeWinners                = $this->__winnersRepository->getTopThreeWinnersFromUploadsTable();

            // Get prize data
            $prizesData                     = $this->__winnersRepository->getPrizeData();

            // Get timestamp of when the winner was chosen
            $time                           = Carbon::now();
            $timeStamp                      = $time->toDateTimeString();

            // First place data
            $firstPlaceUserId               = $topThreeWinners[0]->UserID;
            $firstPlaceLikes                = $topThreeWinners[0]->likes;
            $firstPlaceWinnerId             = 'w-' . Str::uuid()->toString();
            $firstPlaceUrl                  = $topThreeWinners[0]->url;
            $firstPlacePrizeId              = $prizesData[0]->prizeId;
            $firstPlaceName                 = $topThreeWinners[0]->name;
            $firstPlaceEmail                = $topThreeWinners[0]->email;

            // Second place data
            $secondPlaceUserId              = $topThreeWinners[1]->UserID;
            $secondPlaceLikes               = $topThreeWinners[1]->likes;
            $secondPlaceWinnerId            = 'w-' . Str::uuid()->toString();
            $secondPlaceUrl                 = $topThreeWinners[1]->url;
            $secondPlacePrizeId             = $prizesData[1]->prizeId;
            $secondPlaceName                = $topThreeWinners[1]->name;
            $secondPlaceEmail               = $topThreeWinners[1]->email;

            // Third place data
            $thirdPlaceUserId               = $topThreeWinners[2]->UserID;
            $thirdPlaceLikes                = $topThreeWinners[2]->likes;
            $thirdPlaceWinnerId             = 'w-' . Str::uuid()->toString();
            $thirdPlaceUrl                  = $topThreeWinners[2]->url;
            $thirdPlacePrizeId              = $prizesData[2]->prizeId;
            $thirdPlaceName                 = $topThreeWinners[2]->name;
            $thirdPlaceEmail                = $topThreeWinners[2]->email;

            $emailDataFirstPlace = [
                'from' => 'Phopixel Team <noreply@phopixel.com>',
                'to' => $firstPlaceEmail,
                'place' => "1st Place",
                'name' => $firstPlaceName,
                'subject' => "You're the 1st Place Winner!",
                'html' => htmlEmail('email.winners.winners_email', [
                    'winnerData' => $firstPlaceName,
                    'place' => '1st Place'
                ])
            ];

            $emailDataSecondPlace = [
                'to' => $secondPlaceEmail,
                'from' => 'Phopixel Team <noreply@phopixel.com>',
                'place' => "2nd Place",
                'name' => $secondPlaceName,
                'subject' => "You're the 2nd Place Winner!",
                'html' => htmlEmail('email.winners.winners_email', [
                    'winnerData' => $secondPlaceName,
                    'place' => '2nd Place'
                ])
            ];

            $emailDataThirdPlace = [
                'to' => $thirdPlaceEmail,
                'from' => 'Phopixel Team <noreply@phopixel.com>',
                'place' => "3rd Place",
                'name' => $thirdPlaceName,
                'subject' => "You're the 3rd Place Winner!",
                'html' => htmlEmail('email.winners.winners_email', [
                    'winnerData' => $thirdPlaceName,
                    'place' => '3rd Place'
                ])
            ];

            $this->mailgunSendMessage($emailDataFirstPlace);
            $this->mailgunSendMessage($emailDataSecondPlace);
            $this->mailgunSendMessage($emailDataThirdPlace);

            $winnersDataFirstPlace = [
                'UserID'                    => $firstPlaceUserId,
                'email'                     => $firstPlaceEmail,
                'place'                     => "1st Place",
                'likes'                     => $firstPlaceLikes,
                'winnerId'                  => $firstPlaceWinnerId,
                'url'                       => $firstPlaceUrl,
                'prizeId'                   => $firstPlacePrizeId,
                'timeStamp'                 => $timeStamp,
                'name'                      => $firstPlaceName
            ];

            $winnersDataSecondPlace = [
                'UserID'                    => $secondPlaceUserId,
                'email'                     => $secondPlaceEmail,
                'place'                     => "2nd Place",
                'likes'                     => $secondPlaceLikes,
                'winnerId'                  => $secondPlaceWinnerId,
                'url'                       => $secondPlaceUrl,
                'prizeId'                   => $secondPlacePrizeId,
                'timeStamp'                 => $timeStamp,
                'name'                      => $secondPlaceName
            ];

            $winnersDataThirdPlace = [
                'UserID'                    => $thirdPlaceUserId,
                'email'                     => $thirdPlaceEmail,
                'place'                     => "3rd Place",
                'likes'                     => $thirdPlaceLikes,
                'winnerId'                  => $thirdPlaceWinnerId,
                'url'                       => $thirdPlaceUrl,
                'prizeId'                   => $thirdPlacePrizeId,
                'timeStamp'                 => $timeStamp,
                'name'                      => $thirdPlaceName
            ];

            // store them in winners table
            Winners::create($winnersDataFirstPlace);
            Winners::create($winnersDataSecondPlace);
            Winners::create($winnersDataThirdPlace);

            // store in legacy winners table
            LegacyWinners::create($winnersDataFirstPlace);
            LegacyWinners::create($winnersDataSecondPlace);
            LegacyWinners::create($winnersDataThirdPlace);

            // Truncate the data in the uploads table to make way for the coming week's uploads
            if(Uploads::count() > 0) {
                Uploads::truncate();
            }

        } catch(\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

    }
}
