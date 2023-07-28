<?php

namespace App\Http\Controllers;

use App\Dal\Interfaces\IUsersRepository;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    /**
     * @var IUsersRepository
     */
    protected $__usersRepository;

    public function __construct(IUsersRepository $usersRepository)
    {
        $this->__usersRepository = $usersRepository;
    }

    public function handleLike(Request $request)
    {
        try {
            $loggedInUserId                          = Auth::user()['UserID'];
            $likedUserId                             = $request->get('UserID');
            $likedPhotoId                            = $request->get('likedPhotoId');
            $createUpdateUserLikesData               = $this->__usersRepository->createUpdateUserLikesData($loggedInUserId, $likedPhotoId);

            $this->__usersRepository->handleLike($likedUserId);
            $getUserLikes                            = $this->__usersRepository->getUserLikes($likedUserId);
            $userLikes                               = $getUserLikes[0]->likes;

            return [
                'UserID'                             => $likedUserId,
                'loggedInUserId'                     => $loggedInUserId,
                'likedPhotoId'                       => $likedPhotoId,
                'userLikes'                          => $userLikes,
                'createUpdateUserLikesData'          => $createUpdateUserLikesData,
            ];

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

    }

    public function handleDislike(Request $request)
    {
        try {
            $loggedInUserId                          = Auth::user()['UserID'];
            $likedUserId                             = $request->get('UserID');
            $dislikedPhotoId                         = $request->get('dislikedPhotoId');
            $updateDisklikesData                     = $this->__usersRepository->updateDisklikesData($loggedInUserId, $dislikedPhotoId);

            $this->__usersRepository->handleDislike($likedUserId);
            $getUserLikes                            = $this->__usersRepository->getUserLikes($likedUserId);
            $userLikes                               = $getUserLikes[0]->likes;

            return [
                'UserID'                             => $likedUserId,
                'loggedInUserId'                     => $loggedInUserId,
                'dislikedPhotoId'                    => $dislikedPhotoId,
                'userLikes'                          => $userLikes,
                'updateDisklikesData'                => $updateDisklikesData,
            ];

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

    }

    public function deleteUserUpload(Request $request)
    {
        try {
            $userId              = $request->get('UserID');
            $deleteUserUpload    = $this->__usersRepository->deleteUserUpload($userId);

            if(!$deleteUserUpload) {
                return response()->json(["status" => "Failed to delete!", 'UserID' => $userId]);
            }

            return response()->json(["message" => "You've deleted your photo", 'UserID' => $userId]);

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }
    }

    public function getUserUploadsData()
    {
        $loggedInUserId = Auth::user()['UserID'];

        return $this->__usersRepository->getUploads($loggedInUserId);
    }

    public function getUserLikes($userId)
    {
        return $this->__usersRepository->getUserLikes($userId);
    }

    public function getDataFromUserLikesTable()
    {
        $loggedInUserId = Auth::user()['UserID'];

        return $this->__usersRepository->getDataFromUserLikesTable($loggedInUserId);
    }

    public function getUserData() {
        return Auth::user();
    }

    public function changePassword(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'currentPassword' => 'required',
            'newPassword' => [
                'required',
                'min:8', // password must be at least 8 characters
                'regex:/^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/', // password must be alphanumeric and contain a special character
            ],
        ]);

        if($validator->fails()) {
            $failedRules            = $validator->failed();

            if(isset($failedRules['newPassword']['Min'])) {
                return response()->json(['status' => 'failed', 'message' => 'Password must contain 8 characters!'], 400);
            }

            if(isset($failedRules['newPassword']['Regex'])) {
                return response()->json(['status' => 'failed', 'message' => 'Password must be alphanumeric and contain a special character!'], 400);
            }
        }

        $user = Auth::user();

        if (!Hash::check($request->currentPassword, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 401);
        }

        $user->password = Hash::make($request->newPassword);
        $user->save();

        return response()->json(['message' => 'Password changed successfully'], 200);
    }

    public function updateEmail(Request $request)
    {
        try {
            $request->validate([
                'updateEmail'=>'required|email|string|max:255'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e ) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

        $user = Auth::user();

        if(!$user) {
            return response()->json(['message' => 'No authenticated user'], 401);
        }

        $user->email = $request->updateEmail;
        $user->save();

        // refresh the authenticated user data
        Auth::setUser($user);

        return response()->json(['message' => 'Email updated successfully'], 200);
    }

    public function updateName(Request $request)
    {
        try {
            $request->validate([
                'updateName'=>'required|string|max:20'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e ) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

        $user = Auth::user();

        if(!$user) {
            return response()->json(['message' => 'No authenticated user'], 401);
        }

        $user->name = $request->updateName;
        $user->save();

        // refresh the authenticated user data
        Auth::setUser($user);

        return response()->json(['message' => 'Name updated successfully'], 200);
    }

}
