<?php

namespace App\Dal\Interfaces;

interface IUsersRepository
{
    public function updateUserLikes($userId, $userLikes);
    public function getUserLikes($userId);
}
