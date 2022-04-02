<?php

namespace App\Dal\Interfaces;

interface IWinnersRepository
{
    public function getTopThreeWinnersFromUploadsTable();
    public function getTopThreeWinnersFromWinnersTable();
    public function getPrizeData();
    public function insertFirstPlace();
    public function insertSecondPlace();
    public function insertShirdPlace();
}
