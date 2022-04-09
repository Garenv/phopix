<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;

class SupportController extends Controller
{

    public function support(Request $request)
    {
        $name         = $request->get('name');
        $email        = $request->get('email');
        $file         = $request->file('file');
        $messageText  = $request->get('message');

        $data = [
            'name'    => $name,
            'email'   => $email,
            'file'    => $file,
            'message' => $messageText
        ];

        $publicPath   = public_path('/attachments/');
        $fileName     = $file->getClientOriginalName();
        $file->move($publicPath, $fileName);
        $attachFile   = [$publicPath . $fileName];

        Mail::send('email.support.support', $data, function($message) use($data, $attachFile) {
            $message->to('garen.vartanian@apexunitedllc.com');

            foreach ($attachFile as $file){
                $message->attach($file);
            }
        });

        view('email.support.support', compact('name', 'email', 'file', 'messageText'));

        return Redirect::back()->with('success', 'Successfully submitted!');
    }
}
