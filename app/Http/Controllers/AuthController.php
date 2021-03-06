<?php

namespace App\Http\Controllers;

use App\Models\User;
use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Stevebauman\Location\Facades\Location;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;


class AuthController extends Controller
{

    /**
     * return error response.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendError($error, $errorMessages = [], $code = 401)
    {
        $response = [
            'success'         => false,
            'message'         => $error,
        ];

        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }

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

            $credentials    = $request->only('email', 'password');;

            if (!Auth::attempt($credentials)) {
                return response()->json(['message' => 'Incorrect email or password!'], 401);
            }

            $user           = Auth::user();
            $name           = $user['name'];
            $email          = $user['email'];
            $userId         = $user['UserID'];
            $age            = $user['age'];
            $sessionId      = Session::getId();
            $modelUser      = User::where('email', $email)->firstOrFail();
            $createToken    = $modelUser->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status'    => true,
                'token'     => $createToken,
                'name'      => $name,
                'email'     => $email,
                'UserID'    => $userId,
                'age'       => $age,
                'sessionId' => $sessionId
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
                'age'           => 'required',
                'password'      => 'required|min:6',
            ]);

            if($validator->fails()) {
                $failedRules    = $validator->failed();

                if(isset($failedRules['email']['Unique'])) {
                    return response()->json(['status' => 'failed', 'message' => 'Looks like you already have an account!'], 400);
                }

            }

            $userId              = 'u-' . Str::uuid()->toString();
            $data                = $request->all();
            $data['UserID']      = $userId;
            $name                = $data['name'];
            $age                 = $data['age'];

            $locationData        = Location::get();

            $data['ip']          = $locationData->ip;
            $data['countryName'] = $locationData->countryName;
            $data['countryCode'] = $locationData->countryCode;
            $data['regionCode']  = $locationData->regionCode;
            $data['regionName']  = $locationData->regionName;
            $data['cityName']    = $locationData->cityName;
            $data['zipCode']     = $locationData->zipCode;

            $user = $this->create($data);

            return response()->json([
                "status"         => true,
                "name"           => $name,
                "UserID"         => $userId,
                "message"        => "Registered Successfully!",
                "age"            => $age,
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
            'name'        => $data['name'],
            'email'       => $data['email'],
            'UserID'      => $data['UserID'],
            'age'         => $data['age'],
            'password'    => Hash::make($data['password']),
            'ip'          => $data['ip'],
            'countryName' => $data['countryName'],
            'countryCode' => $data['countryCode'],
            'regionCode'  => $data['regionCode'],
            'regionName'  => $data['regionName'],
            'cityName'    => $data['cityName'],
            'zipCode'     => $data['zipCode']
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

    }

    public function showResetPasswordForm($token)
    {
        return view('email.forgot_password_link', ['token' => $token]);
    }

    public function submitResetPasswordForm(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email'                               => 'required|email|exists:users,email',
                'password'                            => 'required|min:6',
                'password_confirmation'               => 'required|min:6|same:password'
            ]);

            if($validator->fails()) {
                $failedRules                          = $validator->failed();

                if(isset($failedRules['password_confirmation']['Same'])) {
                    return Redirect::back()->with('passwordNotMatching', "The entered passwords don't match!");
                }

                if(isset($failedRules['email']['Exists'])) {
                    return Redirect::back()->with('failed', "We can't find that account!");
                }

            }

            $email                                       = $request->get('email');
            $token                                       = $request->get('token');
            $password                                    = $request->get('password');

            $data = [
                'email'                                  => $email,
                'token'                                  => $token
            ];

            $updatePassword = DB::table('password_resets')->where($data)->first();

            if(!$updatePassword){
                return Redirect::back()->with("invalidToken", "Something went wrong, please contact");
            }

            User::where('email', $email)->update(['password' => Hash::make($password)]);

            DB::table('password_resets')->where(['email' => $email])->delete();

            return Redirect::back()->with('success', "Successfully updated your account password!");

        } catch(\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

    }
}
