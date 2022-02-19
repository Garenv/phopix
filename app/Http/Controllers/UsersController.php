<?php

namespace App\Http\Controllers;

use App\Dal\Interfaces\IUsersRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function incrementDecrementLike(Request $request)
    {

        $userId                        = $request->get('UserID');
        try {
            $params                    = $request->all();
            $likeCount                 = $params['likeCount'];

            $getUserLikes              = $this->__usersRepository->getUserLikes($userId);
            $userLikes                 = $getUserLikes[0]->likes;

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
                'likeUpdated'          => $incrementDecrementLike
            ];
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

    }

    public function getUserUploadsData() {
        return $this->__usersRepository->getUploads();
    }

}
