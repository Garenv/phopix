<?php

namespace App\Http\Controllers;

use App\Dal\Interfaces\IUsersRepository;
use Illuminate\Http\Request;
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

    public function incrementDecrementLike(Request $request)
    {
        try {
            $userId                    = $request->get('UserID');
            $likeCount                 = $request->get('likeCount');
            $getUserLikes              = $this->__usersRepository->getUserLikes($userId);
            $userLikes                 = $getUserLikes[0]->likes;

            if($userLikes >= 1) {
                $userLikes--;
                $this->__usersRepository->incrementDecrementLike($userId, $userLikes, $likeCount);
            }

            $userLikes++;
            $incrementDecrementLike    = $this->__usersRepository->incrementDecrementLike($userId, $userLikes, $likeCount);

            if(!$incrementDecrementLike) {
                return [
                    'status'           => 'failed',
                    'message'          => 'something went wrong!'
                ];
            }

            return [
                'status'               => "successful",
                'UserID'               => $userId,
                'incrementDecrementLikes'            => $incrementDecrementLike,
            ];
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

    }

    public function getUserLikes($userId) {
        $this->__usersRepository->getUserLikes($userId);
    }

}
