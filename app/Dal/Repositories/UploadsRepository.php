<?php

namespace App\Dal\Repositories;

use App\Dal\Entities\Uploads;
use App\Dal\Interfaces\IUploadsRepository;
use Prettus\Repository\Eloquent\BaseRepository;

class UploadsRepository extends BaseRepository implements IUploadsRepository
{
    /**
     * @return string
     */
    public function getUploads(): string
    {
        return "lflmkslmk";
    }

    /**
     * @return string
     */
    public function model()
    {
        return Uploads::class;
    }
}
