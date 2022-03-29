<?php

namespace App\Dal\Interfaces;

interface IUsersRepository
{
    public function incrementDecrementLike($userId, $userLikes, $likeCount);
    public function getUserLikes($userId);
    public function deleteUserUpload($userId);
    public function selectTopThreeWinners();
}
