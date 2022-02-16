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

    public function postUserLike(Request $request)
    {

        $userId              = $request->get('UserID');
        try {
            $params          = $request->all();

            $validation      = Validator::make($params , [
                'like'       => 'required|integer'
            ]);

            $checkValidation = $validation->fails();
            $getUserLikes = $this->__usersRepository->getUserLikes($userId);
            $userLikes = $getUserLikes[0]->likes;

            $updateUserLikes = $this->__usersRepository->updateUserLikes($userId, $userLikes);

            if(!$checkValidation && !is_null($updateUserLikes)) {
                return [
                    'status' => "successful",
                    'UserID' => $userId,
                    'likeUpdated'  => $updateUserLikes
                ];
            }

            return [
                'status'     => 'failed',
                'message'    => 'something went wrong!'
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
