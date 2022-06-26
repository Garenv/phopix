<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class SupportController extends Controller
{

    public function support(Request $request)
    {
        try {
            $name                        = $request->get('name');
            $email                       = $request->get('email');
            $file                        = $request->file('file');
            $messageText                 = $request->get('messageText');

            $validator = Validator::make($request->all() , [
                'name'                   => 'required|string|max:30',
                'email'                  => 'required|email',
                'file'                   => 'mimes:png,jpeg,jpg,heic,mov,mp4|max:2048',
                'messageText'            => 'required|min:10'
            ]);

            if($validator->fails()) {
                $failedRules             = $validator->failed();

//                if(isset($failedRules['name']['Max'])) {
//                    return response()->json(['status' => 'failed', 'message' => "Too many characters!"], 422);
//                }

                if(isset($failedRules['name']['Required'])) {
                    return response()->json(['status' => 'failed', 'message' => "Don't forget to enter your name!"], 422);
                }

                if(isset($failedRules['email']['Email'])) {
                    return response()->json(['status' => 'failed', 'message' => 'Incorrectly formatted email address!'], 422);
                }

                if(isset($failedRules['messageText']['Min'])) {
                    return response()->json(['status' => 'failed', 'message' => 'Message is too short!'], 422);
                }

            }

            $data = [
                'name'                   => $name,
                'email'                  => $email,
                'messageText'            => $messageText
            ];

            $publicPath                  = public_path('/attachments/');
            $fileName                    = $file->getClientOriginalName();
            $attachFile                  = [$publicPath . $fileName];

            $file->move($publicPath, $fileName);

            Mail::send('email.support.support', $data, function($message) use($data, $attachFile) { // ,$attachFile
                $message->to('garen.vartanian@apexunitedllc.com');

                foreach ($attachFile as $file){
                    $message->attach($file);
                }
            });

            $mailFailures                = Mail::failures();
            $mailFailuresCount           = count($mailFailures);

            if($mailFailuresCount > 0) {
                return response()->json(['status' => 'failed', 'message' => 'Message not sent!'], 422);
            }

            view('email.support.support', compact('name', 'email', 'messageText'));

            return response()->json(['status' => 'success', 'message' => 'Successfully Sent!']);

        } catch(\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

    }
}
