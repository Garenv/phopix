<?php

namespace App\Dal\Interfaces;

interface IUsersRepository
{
    public function incrementDecrementLike($userId, $userLikes, $likeCount);
    public function getUserLikes($userId);
    public function deleteUserUpload($userId);
    public function handleLike($likedUserId);
    public function handleDislike($likedUserId);
    public function getLoggedInUserLikedPhotoData($loggedInUserId);
    public function insertUserLikesData($loggedInUserId, $likedPhotoId);
    public function insertDisLikesData($loggedInUserId, $likedPhotoId);

}
