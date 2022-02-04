<?php

namespace App\Dal\Interfaces;

interface IUsersRepository
{
    public function insertUserLike($userId, $like);
    public function getUserLikes($userId);
}
