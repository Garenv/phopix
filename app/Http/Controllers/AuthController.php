<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Dotenv\Validator;
use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller {

    public function login(Request $request) {
        $response = [
            "status"    => false,
            "message"   => "Login failed"
        ];

        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);


        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return $response;
        }

        return [
            "status"  => true,
            "message" => "Logged in Successfully!"
        ];

    }

    public function register(Request $request) {
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
    public function create(array $data) {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'UserID' => $data['UserID'],
            'age' => $data['age'],
            'password' => Hash::make($data['password'])
        ]);
    }
}
