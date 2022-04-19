<?php

namespace App\Http\Controllers;

use App\Models\Prizes;

class PrizesController extends Controller
{
    public function getPrizes()
    {
        return Prizes::all();
    }
}
