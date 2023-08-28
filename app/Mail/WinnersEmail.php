<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WinnersEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($firstPlaceWinner, $secondPlaceWinner, $thirdPlaceWinner)
    {
        $this->firstPlaceWinner = $firstPlaceWinner;
        $this->secondPlaceWinner = $secondPlaceWinner;
        $this->thirdPlaceWinner = $thirdPlaceWinner;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('New Winners Email '. $this->firstPlaceWinner)->view('email.winners.winners_email')
            ->with(
                [
                    'firstPlaceWinner' => $this->firstPlaceWinner,
                    'secondPlaceWinner' => $this->secondPlaceWinner,
                    'thirdPlaceWinner' => $this->thirdPlaceWinner,
                ]
            );
    }
}
