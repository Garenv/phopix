<?php

namespace App\Http\Controllers;

use App\Dal\Interfaces\IUploadsRepository;

class FileUploadController extends Controller
{

    protected $__uploadsRepository;


    public function __construct(IUploadsRepository $uploadsRepository)
    {
        $this->__uploadsRepository = $uploadsRepository;
    }

    public function getUploads(): string
    {
        return $this->__uploadsRepository->getUploads();
    }
}
