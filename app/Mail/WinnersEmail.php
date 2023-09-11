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
     * @var mixed
     */
    private $winnerData;

    /**
     * @var mixed
     */
    private $place;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($winnerData, $place)
    {
        $this->winnerData = $winnerData;
        $this->place = $place;
    }


    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Winner Email')->view('email.winners.winners_email')
            ->with([
                'winnerData' => $this->winnerData,
                'place' => $this->place,
            ]);

    }
}
