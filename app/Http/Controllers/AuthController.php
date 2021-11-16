<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Dotenv\Validator;
use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Stevebauman\Location\Facades\Location;
use function Symfony\Component\String\u;

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
        $request->validate([
            'name'     => 'required',
            'email'    => 'required|email|unique:users',
            'age'      => 'required',
            'password' => 'required|min:6',
        ]);

        $userId         = 'u-' . Str::uuid()->toString();
        $data           = $request->all();
        $data['UserID'] = $userId;
        $age            = $data['age'];

        $locationData   = Location::get();

        $data['ip']             = $locationData->ip;
        $data['countryName']    = $locationData->countryName;
        $data['countryCode']    = $locationData->countryCode;
        $data['regionCode']     = $locationData->regionCode;
        $data['regionName']     = $locationData->regionName;
        $data['cityName']       = $locationData->cityName;
        $data['zipCode']        = $locationData->zipCode;

        $this->create($data);

        return [
            "status"  => true,
            "UserID"  => $userId,
            "message" => "Registered Successfully!",
            "age"     => $age
        ];
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
}
