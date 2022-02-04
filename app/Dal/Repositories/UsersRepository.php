<?php

namespace App\Dal\Repositories;


use App\Dal\Interfaces\IUsersRepository;
use Illuminate\Support\Facades\DB;

class UsersRepository implements IUsersRepository
{
    public function insertUserLike($userId, $like) {
        $data = ['likes' => $like];
        return DB::table('uploads')->where('UserID', $userId)->update($data);
    }

    public function getUserLikes($userId) {
        return DB::table('uploads')->select('likes')->get();
    }


}



