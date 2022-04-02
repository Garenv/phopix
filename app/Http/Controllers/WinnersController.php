<?php

namespace App\Http\Controllers;

use App\Dal\Interfaces\IWinnersRepository;

/**  NOTE: There will always ONLY be 3 winners (1st place, 2nd place and 3rd place) */

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

    /**
     * Selects the top three winners from the
     * uploads table to get the crob job ready
     * @return mixed
     */
    public function getTopThreeWinnersFromUploadsTable()
    {
        return $this->__winnersRepository->getTopThreeWinnersFromUploadsTable();
    }

    /**
     * Selects the top three winners from the
     * winners table and sends data to the frontend
     * @return mixed
     */
    public function getTopThreeWinnersFromWinnersTable()
    {
        return $this->__winnersRepository->getTopThreeWinnersFromWinnersTable();
    }
}
