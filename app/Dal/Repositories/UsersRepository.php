<?php

namespace App\Dal\Repositories;


use App\Dal\Interfaces\IUsersRepository;
use App\Models\Upload;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UsersRepository implements IUsersRepository
{
    public function incrementDecrementLike($userId, $userLikes, $likeCount)
    {
        $data = ['likes' => $likeCount > 1 ? $userLikes - 1 : $userLikes + 1];
        DB::table('uploads')
            ->where('UserID', $userId)
            ->update($data);
        return $data['likes'];
    }

    public function getUserLikes($userId)
    {
        return DB::table('uploads')
            ->select('likes')
            ->where('UserID', $userId)
            ->get();
    }

    public function getUploads()
    {
        return DB::table('uploads')
            ->select('uploads.url', 'uploads.likes', 'users.UserID', 'users.name')
            ->join('users', 'users.UserID', '=', 'uploads.UserID')
            ->get();
    }

    public function selectTopThreeWinners()
    {
        return DB::table('uploads')
            ->select('users.name', 'uploads.likes', 'uploads.url')
            ->join('users', 'users.UserID', '=', 'uploads.UserID')
            ->orderBy('likes', 'desc')
            ->limit(3)
            ->get();
    }

    public function deleteUserUpload($userId)
    {
        return Upload::where('UserID', $userId)->delete();
    }


}



