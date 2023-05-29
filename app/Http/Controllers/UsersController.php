<?php

namespace App\Http\Controllers;

use App\Dal\Interfaces\IUsersRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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

}
