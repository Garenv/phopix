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
        $user            = Auth::user();
        $userId          = $user['UserID'];

        try {
            $params          = $request->all();
            $like            = $params['like'];

            $validation      = Validator::make($params , [
                'like'       => 'required|integer'
            ]);

            $checkValidation = $validation->fails();
            $updateUserLikes = $this->__usersRepository->insertUserLike($userId, $like);

            if(!$checkValidation && $updateUserLikes) {
                return [
                    'status' => "successful",
                    'UserID' => $userId,
                    'likes'  => $like
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

    public function getUserLikes() {
        $user            = Auth::user();
        $userId          = $user['UserID'];

        try {
            $updateUserLikes = $this->__usersRepository->getUserLikes($userId);

            if(!empty($updateUserLikes)) {
                $totalLikes = [];

                collect($updateUserLikes)->each(function ($item) use (&$totalLikes) {
                    $totalLikes[] = (object) $item;
                });

                return [
                    'status'          => 'success',
                    'UserID'          => $userId,
                    'totalLikes'      => $totalLikes
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
}
