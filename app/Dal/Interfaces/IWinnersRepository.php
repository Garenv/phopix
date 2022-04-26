<?php

namespace App\Dal\Interfaces;

interface IWinnersRepository
{
    public function getPrizeData();
    public function getTopThreeWinnersFromUploadsTable();
    public function getTopThreeWinnersFromWinnersTable();
    public function getAllWinnersFromLegacyWinnersTable();
}
