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
        return $this->__usersRepository->selectTopThreeWinners();
    }
}
