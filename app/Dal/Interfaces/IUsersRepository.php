<?php

namespace App\Dal\Interfaces;

interface IUsersRepository
{
    public function incrementDecrementLike($userId, $userLikes, $likeCount);
    public function getUserLikes($userId);
}
