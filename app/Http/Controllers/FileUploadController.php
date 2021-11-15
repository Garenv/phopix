<?php

namespace App\Http\Controllers;

use App\Models\Upload;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FileUploadController extends Controller
{

    public function fileUpload(Request $request)
    {

        $path = "/assets/images/phopix/user/";
        $file = $request->file('userUpload');
        $imgName = $file->getClientOriginalName();
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
}
