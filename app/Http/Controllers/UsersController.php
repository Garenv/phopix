<?php

namespace App\Http\Controllers;

use App\Dal\Interfaces\IUsersRepository;
use App\Models\Uploads;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
//            dd($request->all());
            $userId                                  = $request->get('UserID');
            $liked                                   = $request->get('liked');
            Uploads::where(['UserID' => $userId])->update(
                ['likes' => DB::raw('likes + 1'), 'liked' => $liked ?? 0]
            );
            $getUserLikes                            = $this->__usersRepository->getUserLikes($userId);
            $userLikes                               = $getUserLikes[0]->likes;

            return [
                'UserID'                             => $userId,
                'userLikes'                          => $userLikes,
                'liked'                              => $liked
            ];
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

    }

    public function handleDislike(Request $request)
    {
        try {
//            dd($request->all());
            $userId                                  = $request->get('UserID');
            $disliked                                = $request->get('disliked');
            Uploads::where(['UserID' => $userId])->update(
                ['likes' => DB::raw('likes - 1'), 'liked' => $disliked ?? 0]
            );
            $getUserLikes                            = $this->__usersRepository->getUserLikes($userId);
            $userLikes                               = $getUserLikes[0]->likes;

            return [
                'UserID'                             => $userId,
                'userLikes'                          => $userLikes,
                'liked'                              => $disliked
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
        return $this->__usersRepository->getUploads();
    }

    public function getUserLikes($userId)
    {
        return $this->__usersRepository->getUserLikes($userId);
    }

}
