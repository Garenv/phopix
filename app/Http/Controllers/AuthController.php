<?php

namespace App\Http\Controllers;

use App\Models\User;
use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
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
            'success' => false,
            'message' => $error,
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
                'email'    => 'required',
                'password' => 'required',
            ]);

            $credentials = $request->only('email', 'password');

            if (!Auth::attempt($credentials)) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            $user        = Auth::user();
            $name        = $user['name'];
            $email       = $user['email'];
            $userId      = $user['UserID'];
            $age         = $user['age'];

            $modelUser   = User::where('email', $email)->firstOrFail();
            $createToken = $modelUser->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status' => true,
                'token'  => $createToken,
                'name'   => $name,
                'email'  => $email,
                'UserID' => $userId,
                'age'    => $age
            ]);

        } catch(\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

    }

    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(),[
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'age' => 'required',
                'password' => 'required|min:6',
            ]);

            if($validator->fails()) {
                $failedRules = $validator->failed();

                if(isset($failedRules['email']['Unique'])) {
                    return response()->json(['status' => 'failed', 'message' => 'Looks like you already have an account!'], 400);
                }

            }

            $userId = 'u-' . Str::uuid()->toString();
            $data = $request->all();
            $data['UserID'] = $userId;
            $age = $data['age'];

            $locationData = Location::get();

            $data['ip'] = $locationData->ip;
            $data['countryName'] = $locationData->countryName;
            $data['countryCode'] = $locationData->countryCode;
            $data['regionCode'] = $locationData->regionCode;
            $data['regionName'] = $locationData->regionName;
            $data['cityName'] = $locationData->cityName;
            $data['zipCode'] = $locationData->zipCode;

            $user = $this->create($data);

            return response()->json([
                "status" => true,
                "UserID" => $userId,
                "message" => "Registered Successfully!",
                "age" => $age,
                'token' => $user->createToken('tokens')->plainTextToken
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

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function showForgotPasswordForm()
    {
        return view('auth.forgetPassword');
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function submitForgotPasswordForm(Request $request)
    {
        $forgotPasswordEmail = $request->input('email');


        $request->validate([
            'email' => 'unique:users,email,10',
        ]);

        $token = Str::random(64);

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
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function showResetPasswordForm($token) {
        return view('email.forgot_password_link', ['token' => $token]);
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function submitResetPasswordForm(Request $request)
    {
//        dd($request->all());
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required'
        ]);

        $updatePassword = DB::table('password_resets')
            ->where([
                'email' => $request->email,
                'token' => $request->token
            ])
            ->first();

        dd($updatePassword);

        if(!$updatePassword){
            return back()->withInput()->with('error', 'Invalid token!');
        }

        User::where('email', $request->email)
            ->update(['password' => Hash::make($request->password)]);

        DB::table('password_resets')->where(['email'=> $request->email])->delete();

    }


}
