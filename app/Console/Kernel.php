<?php

namespace App\Console;

use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // Truncate the winners table every other Wednesday at 12:00am EST
        $schedule->command('truncate:winners')->timezone('America/New_York')->weeklyOn(3, '0:00')->when(function () {
            // Carbon's week starts from Monday. So, first Monday of the year is week 1.
            // If the current week number is even, then it's an "other" week.
            return Carbon::now()->weekOfYear % 2 == 0;
        });

        // Execute 'weekly:winners' every Wednesday at 12:00am EST
        $schedule->command('weekly:winners')->timezone('America/New_York')->weeklyOn(3, '0:00')->appendOutputTo('storage/logs/scheduler.log');

    }

    public function scheduleTimezone()
    {
        return 'America/Chicago';
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
