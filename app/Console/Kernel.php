<?php

namespace App\Console;

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
        $schedule->command('weekly:winners')->timezone('America/New_York')->weeklyOn(6, '11:34');
        $schedule->command('truncate:winners')->timezone('America/New_York')->weekly()->weekdays()->when(function () {
            // Truncate winners table every other Wednesday
            // see https://stackoverflow.com/a/55832938 for reference
            return date('W') % 2;
        })->at('00:00:01');
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
