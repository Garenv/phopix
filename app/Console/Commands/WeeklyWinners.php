<?php

namespace App\Console\Commands;

use App\Dal\Interfaces\IWinnersRepository;
use App\Mail\WinnersEmail;
use App\Models\LegacyWinners;
use App\Models\Uploads;
use App\Models\Winners;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
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

            $dataFirstPlace = [
                'UserID'                    => $firstPlaceUserId,
                'place'                     => "1st Place",
                'likes'                     => $firstPlaceLikes,
                'winnerId'                  => $firstPlaceWinnerId,
                'url'                       => $firstPlaceUrl,
                'prizeId'                   => $firstPlacePrizeId,
                'timeStamp'                 => $timeStamp,
                'name'                      => $firstPlaceName,
                'email'                     => $firstPlaceEmail
            ];

            $dataSecondPlace = [
                'UserID'                    => $secondPlaceUserId,
                'place'                     => "2nd Place",
                'likes'                     => $secondPlaceLikes,
                'winnerId'                  => $secondPlaceWinnerId,
                'url'                       => $secondPlaceUrl,
                'prizeId'                   => $secondPlacePrizeId,
                'timeStamp'                 => $timeStamp,
                'name'                      => $secondPlaceName,
                'email'                     => $secondPlaceEmail
            ];

            $dataThirdPlace = [
                'UserID'                    => $thirdPlaceUserId,
                'place'                     => "3rd Place",
                'likes'                     => $thirdPlaceLikes,
                'winnerId'                  => $thirdPlaceWinnerId,
                'url'                       => $thirdPlaceUrl,
                'prizeId'                   => $thirdPlacePrizeId,
                'timeStamp'                 => $timeStamp,
                'name'                      => $thirdPlaceName,
                'email'                     => $thirdPlaceEmail
            ];

//            dd($dataFirstPlace, $dataSecondPlace, $dataThirdPlace);

            // store them in Redis
            // Redis::set("user_data:$firstPlaceUserId", json_encode($dataFirstPlace));

            // garenvartanian1992@gmail.com - 1st place
            // garen.vartanian@phopixel.com - 2nd place
            // garenvartanian24@gmail.com - 3rd place

//            dd($dataFirstPlace);

            switch($dataFirstPlace['place']) {
                case '1st Place':
                    Mail::to($dataFirstPlace['email'])->send(new WinnersEmail($dataFirstPlace, $dataSecondPlace, $dataThirdPlace));
                case '2nd Place':
            }

            Mail::to($dataFirstPlace['email'])->send(new WinnersEmail($dataFirstPlace, $dataSecondPlace, $dataThirdPlace));
            Mail::to($dataSecondPlace['email'])->send(new WinnersEmail($dataFirstPlace, $dataSecondPlace, $dataThirdPlace));
            Mail::to($dataThirdPlace['email'])->send(new WinnersEmail($dataFirstPlace, $dataSecondPlace, $dataThirdPlace));


//            view('email.winners.winners_email', compact('data'));
//
//            exit;

//            Mail::send('email.winners.winners_email', $data, function ($message) use ($view) {
//                // Configure the email and attach the view
//                $message->to('garenvartanian1992@gmail.com')->subject('Winners Email');
//                $message->attachData($view->render(), 'winners_email.html', ['mime' => 'text/html']);

            exit;
//            });

            // store them in winners table
            Winners::create($dataFirstPlace);
            Winners::create($dataSecondPlace);
            Winners::create($dataThirdPlace);

            // store in legacy winners table
            LegacyWinners::create($dataFirstPlace);
            LegacyWinners::create($dataSecondPlace);
            LegacyWinners::create($dataThirdPlace);

            // Truncate the data in the uploads table to make way for the coming week's uploads
            if(Uploads::count() > 0) {
                Uploads::truncate();
            }

    //        if(Winners::count() > 0) {
    //            // Delete last week's winner data in the winners table to ensure this week's winners data is in tact
    //            Winners::whereRaw('timeStamp >= CAST(CURDATE() AS DATETIME) - INTERVAL DAYOFWEEK(CAST(CURDATE() as datetime)) +3 DAY')
    //                ->whereRaw('timeStamp < CAST(CURDATE() AS DATETIME) - INTERVAL DAYOFWEEK(CAST(CURDATE() as datetime)) -4 DAY')->truncate();
    //        }
        } catch(\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

    }
}
