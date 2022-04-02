<?php

namespace App\Console\Commands;

use App\Models\Winners;
use Illuminate\Console\Command;

class TruncateWeeklyWinners extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'truncate:winners';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Artisan Command to truncate weekly winners from winners table';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     */
    public function handle()
    {
        // Truncate winners table for the week to make way for the next top 3 winners
        Winners::truncate();
    }
}
