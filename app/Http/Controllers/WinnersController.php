<?php

namespace App\Http\Controllers;

use App\Dal\Interfaces\IWinnersRepository;

class WinnersController extends Controller
{
    /**
     * @var IWinnersRepository
     */
    protected $__winnersRepository;

    public function __construct(IWinnersRepository $winnersRepository)
    {
        $this->__winnersRepository = $winnersRepository;
    }

    public function selectTopThreeWinners()
    {
        // Grab top 3 winners
        $topThreeWinners                 = $this->__winnersRepository->selectTopThreeWinners();

        // store them in winners table
        // if it's wednesday 23:59:59
        // store in winners_legacy table
        // truncate winners table which should only have 3 rows (top 3 winners)



//        $prizes                          = ["$50 Visa Gift Card", "$25 Amazon Gift Card", "$10 Dollar Tree Gift Card"];

        // Will need to make this dynamic later on
//        $topThreeWinners[0]->firstPlace  = $prizes[0];
//        $topThreeWinners[1]->secondPlace = $prizes[1];
//        $topThreeWinners[2]->thirdPlace  = $prizes[2];

        return $topThreeWinners;
    }
}
