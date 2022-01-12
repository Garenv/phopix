<?php

namespace App\Http\Controllers;

use App\Dal\Interfaces\IUploadsRepository;
use App\Models\Upload;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FileUploadController extends Controller
{

    /**
     * @var IUploadsRepository
     */
    protected $__uploadsRepository;

    public function __construct(IUploadsRepository $uploadsRepository)
    {
        $this->__uploadsRepository = $uploadsRepository;
    }

    public function fileUpload(Request $request)
    {

        dd($request->all());
        $path = env('AWS_S3_PATH');
        $file = $request->file('userUpload');

        $imgName = $file->getClientOriginalName();
//        dd($imgName);
        $bucket = env('AWS_BUCKET');
        $region = env('AWS_REGION');
        $url = "https://{$bucket}.s3.{$region}.amazonaws.com{$path}{$imgName}";
        $userId = Auth::user()['UserID'];

        $file->storeAs(
            $path, // Folder
            $imgName, // Name of image
            's3' // Disk Name
        );

        $data = [
            'url' => $url,
            'UserID' => $userId,
            'isUploaded' => true,
            'timeStamp' => time(),
            'updated_at' => time()
        ];

        Upload::create($data);

        return $data;

    }

    public function getUploads() {
        return $this->__uploadsRepository->getUploads();
    }
}
