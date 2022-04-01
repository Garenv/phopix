<?php

namespace App\Http\Controllers;

use App\Dal\Interfaces\IUsersRepository;

class WinnersController extends Controller
{
    /**
     * @var IUsersRepository
     */
    protected $__usersRepository;

    public function __construct(IUsersRepository $usersRepository)
    {
        $this->__usersRepository = $usersRepository;
    }

    public function selectTopThreeWinners()
    {
        $topThreeWinners                 = $this->__usersRepository->selectTopThreeWinners();

        $prizes                          = ["$50 Visa Gift Card", "$25 Amazon Gift Card", "$10 Dollar Tree Gift Card"];

        // Will need to make this dynamic later on
        $topThreeWinners[0]->firstPlace  = $prizes[0];
        $topThreeWinners[1]->secondPlace = $prizes[1];
        $topThreeWinners[2]->thirdPlace  = $prizes[2];

        return $topThreeWinners;
    }
}
