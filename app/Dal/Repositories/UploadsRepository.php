<?php

namespace App\Dal\Repositories;

use App\Dal\Interfaces\IUploadsRepository;
use Illuminate\Support\Facades\DB;

class UploadsRepository implements IUploadsRepository
{
    /**
     * @return string
     */
    public function getUploads()
    {
        return DB::table('uploads')
            ->select('uploads.url', 'users.name')
            ->join('users', 'users.UserID', '=', 'uploads.UserID')
            ->get();
    }
}
