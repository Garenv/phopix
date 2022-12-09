<?php

namespace App\Dal\Repositories;


use App\Dal\Interfaces\IUsersRepository;
use App\Models\Uploads;
use App\Models\User;
use App\Models\UserLikes;
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
            ->select('likes', 'photo_id')
            ->where('UserID', $userId)
            ->get();
    }

    public function getUploads()
    {
        return DB::table('uploads')
            ->select('uploads.url', 'uploads.likes', 'users.UserID', 'users.name', 'uploads.photo_id', 'user_likes.is_liked', 'user_likes.user_id')
            ->leftJoin('user_likes', 'uploads.photo_id', '=', 'user_likes.photo_id')
            ->rightJoin('users', 'users.UserID', '=', 'uploads.UserID')
            ->where('uploads.url', '<>' ,null)
            ->orderBy('uploads.timeStamp', 'desc')
            ->get();
    }

    public function deleteUserUpload($userId)
    {
        return Uploads::where('UserID', $userId)->delete();
    }

    public function getLoggedInUserLikedPhotoData($loggedInUserId)
    {
        return UserLikes::select('user_id', 'photo_id', 'is_liked')->where('user_id', '=', $loggedInUserId)->get();
    }

    public function handleLike($likedUserId)
    {
        Uploads::where(['UserID' => $likedUserId])->update(['likes' => DB::raw('likes + 1')]);
    }

    public function handleDislike($likedUserId)
    {
        Uploads::where(['UserID' => $likedUserId])->update(['likes' => DB::raw('likes - 1')]);
    }

    public function createUpdateUserLikesData($loggedInUserId, $likedPhotoId)
    {
        return UserLikes::updateOrCreate(['user_id' => $loggedInUserId, 'photo_id' => $likedPhotoId], ['is_liked' => 1]);
    }

    public function updateDisklikesData($loggedInUserId, $dislikedPhotoId)
    {
        return UserLikes::updateOrCreate(['user_id' => $loggedInUserId, 'photo_id' => $dislikedPhotoId, 'is_liked' => 1], ['is_liked' => 0]);
    }

    public function getUserFinalData()
    {
        return DB::table('user_likes')
            ->select( 'uploads.UserID', 'uploads.photo_id', 'user_likes.user_id','user_likes.photo_id')
            ->join('uploads', 'uploads.UserID', '=', 'user_likes.user_id')
            ->join('user_likes', 'uploads.photo_id', '=', 'user_likes.photo_id')
            ->get();
    }

}



