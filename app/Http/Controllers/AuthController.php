<?php

namespace App\Http\Controllers;

use App\Models\User;
use Facade\FlareClient\Http\Response;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;


class AuthController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function login(Request $request)
    {

        try {
            $request->validate([
                'email'     => 'required',
                'password'  => 'required',
            ]);

            $credentials    = $request->only('email', 'password');

            $checkForUserEmail = User::where('email', '=', $request->get('email'))->first();

            if(empty($checkForUserEmail)) {
                return response()->json(['status' => 'failed', 'message' => "We can't find your email in our system!"], 400);
            }

            if (!Auth::attempt($credentials)) {
                return response()->json(['message' => 'Incorrect email or password!'], 401);
            }

            $user                   = Auth::user();
            $name                   = $user['name'];
            $email                  = $user['email'];
            $userId                 = $user['UserID'];
            $age                    = $user['dateOfBirth'];
            $sessionId              = Session::getId();
            $modelUser              = User::where('email', $email)->firstOrFail();
            $authToken              = $modelUser->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status'            => true,
                'token'             => $authToken,
                'name'              => $name,
                'email'             => $email,
                'UserID'            => $userId,
                'dateOfBirth'       => $age,
                'sessionId'         => $sessionId
            ]);

        } catch(\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

    }

    public function register(Request $request)
    {
        try {
            $validator          = Validator::make($request->all(),[
                'name'          => 'required',
                'email'         => 'required|email|unique:users',
                'dateOfBirth'   => 'required',
                'password'      => 'required|min:6',
            ]);

            $age = Carbon::parse($request->get('dateOfBirth'))->age;

            if($validator->fails()) {
                $failedRules    = $validator->failed();

                if(isset($failedRules['email']['Unique'])) {
                    return response()->json(['status' => 'failed', 'message' => 'Looks like you already have an account!'], 400);
                }
            }

            if($age < 13) {
                return response()->json(['status' => 'failed', 'message' => 'You must be 13 years or older to create an account!'], 400);
            }

            $getRealUserIp          = getRealUserIp();

            $getGeoLocationData     = getGeoLocationData($getRealUserIp);

            $getGeoLocationDataResp = json_decode($getGeoLocationData, true);

            $userId                 = 'u-' . Str::uuid()->toString();
            $data                   = $request->all();
            $data['UserID']         = $userId;
            $name                   = $data['name'];
            $data['dateOfBirth']    = Carbon::parse($data['dateOfBirth'])->format('Y-m-d');
            $data['ip']             = $getGeoLocationDataResp['ip_address'];
            $data['countryName']    = $getGeoLocationDataResp['country'];
            $data['countryCode']    = $getGeoLocationDataResp['country_code'];
            $data['regionCode']     = $getGeoLocationDataResp['region_iso_code'];
            $data['regionName']     = $getGeoLocationDataResp['region'];
            $data['cityName']       = $getGeoLocationDataResp['city'];
            $data['zipCode']        = $getGeoLocationDataResp['postal_code'];

            $user = User::create([
                'name'                        => $data['name'],
                'email'                       => $data['email'],
                'UserID'                      => $data['UserID'],
                'dateOfBirth'                 => $data['dateOfBirth'],
                'password'                    => Hash::make($data['password']),
                'ip'                          => $data['ip'],
                'countryName'                 => $data['countryName'],
                'countryCode'                 => $data['countryCode'],
                'regionCode'                  => $data['regionCode'],
                'regionName'                  => $data['regionName'],
                'cityName'                    => $data['cityName'],
                'zipCode'                     => $data['zipCode']
            ]);

            event(new Registered($user));

            return response()->json([
                "status"         => true,
                "name"           => $name,
                "UserID"         => $userId,
                "message"        => "A verification email has been sent. Please check your email.",
                "dateOfBirth"    => Carbon::parse($data['dateOfBirth'])->format('Y-m-d'),
                'token'          => $user->createToken('tokens')->plainTextToken
            ]);
        } catch(\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

    }

    /**
     * Create newly registered user
     *
     * @return response()
     */
    public function create(array $data)
    {
        return User::create([
            'name'                        => $data['name'],
            'email'                       => $data['email'],
            'UserID'                      => $data['UserID'],
            'dateOfBirth'                 => $data['dateOfBirth'],
            'password'                    => Hash::make($data['password']),
            'ip'                          => $data['ip'],
            'countryName'                 => $data['countryName'],
            'countryCode'                 => $data['countryCode'],
            'regionCode'                  => $data['regionCode'],
            'regionName'                  => $data['regionName'],
            'cityName'                    => $data['cityName'],
            'zipCode'                     => $data['zipCode']
        ]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'You have successfully logged out and the token was successfully deleted'
        ];
    }

    public function submitForgotPasswordForm(Request $request)
    {
        $forgotPasswordEmail = $request->input('email');

        $validator           = Validator::make($request->all(),[
            'email'          => 'email'
        ]);

        if($validator->fails()) {
            return response()->json(['status' => 'failed', 'message' => 'Please enter a valid email address'], 400);
        }

        $token = Str::random(64);

        $checkForUserEmail = User::where('email', '=', $forgotPasswordEmail)->first();

        if(empty($checkForUserEmail)) {
            return response()->json(['status' => 'failed', 'message' => "We can't find your email in our system!"], 400);
        }

        DB::table('password_resets')->insert([
            'email' => $forgotPasswordEmail,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);

        Mail::send('email.forgot_password', ['token' => $token], function($message) use($request){
            $message->to($request->get('email'));
            $message->subject('Reset Password');
        });

        return response()->json(['status' => 'success', 'message' => "Successfully sent password reset email"]);

    }

    public function showResetPasswordForm($token)
    {
        return view('email.forgot_password_link', ['token' => $token]);
    }

    public function submitResetPasswordForm(Request $request)
    {

        try {
            $token = $request->get('token');

            $validator = Validator::make($request->all(), [
                'token' => 'required|string',
                'password' => 'required|min:6',
                'password_confirmation' => 'required|min:6|same:password'
            ]);

            $passwordReset = DB::table('password_resets')->where(['token' => $token])->first();

            if (!$passwordReset) {
                return response()->json([
                    'error' => true,
                    'message' => 'This Password Reset token is invalid.'
                ], 404);
            }

            if ($validator->fails()) {
                $failedRules = $validator->failed();

                if (isset($failedRules['password_confirmation']['Same'])) {
                    return Redirect::back()->with('passwordNotMatching', "The entered passwords don't match!");
                }
            }

            $userEmail = DB::table('password_resets')->where('token', $passwordReset->token)->pluck('email');
            $user = User::where('email', $userEmail)->first();

            if (!$user) {
                return response()->json([
                    'error' => true,
                    'message' => 'We cannot find this account in our system!'
                ], 404);
            }

            $user->password = bcrypt($request->password);
            $user->save();
            DB::table('password_resets')->where(['token' => $token])->delete();

            return Redirect::back()->with('success', "Successfully updated your account password!");

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

    }

}
