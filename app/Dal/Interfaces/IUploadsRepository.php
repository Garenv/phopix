<?php

namespace App\Dal\Interfaces;

interface IUploadsRepository
{
    public function checkIfUserHasUploaded($userId);
    public function getAllUploadsData();
}
