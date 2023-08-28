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
     * Gets the top three winners from the
     * uploads table to get the cron job ready
     * @return mixed
     */
    public function getTopThreeWinnersFromUploadsTable()
    {
        return $this->__winnersRepository->getTopThreeWinnersFromUploadsTable();
    }

    /**
     * Gets the top three winners from the
     * winners table and sends data to the frontend
     * based on the cron job's results.
     * This will be called once per week
     * see app/Console/Kernel.php for more details.
     * @return mixed
     */
    public function getTopThreeWinnersFromWinnersTable()
    {
        return $this->__winnersRepository->getTopThreeWinnersFromWinnersTable();
    }

    /**
     * Gets the top three winners from the
     * legacy winners table and sends data to the frontend
     * based on the cron job's results.
     * This will be called once per week
     * see app/Console/Kernel.php for more details.
     * @return mixed
     */
    public function getAllWinnersFromLegacyWinnersTable()
    {
        return $this->__winnersRepository->getAllWinnersFromLegacyWinnersTable();
    }

    public function showWinnersEmail() {
        return view('email.winners.winners_email');
    }

}
