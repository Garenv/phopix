<?php

namespace App\Traits;

use Mailgun\Mailgun;

trait MailgunTrait
{
    public function mailgunApiKey() {
        return Mailgun::create(config('app.mailgun_api_key'));
    }
    public function mailgunSendMessage($data) {
        return $this->mailgunApiKey()->messages()->send(config('app.mailgun_domain'), $data);
    }
}
