<?php

namespace App\Http\Controllers;

use App\Models\Upload;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use function PHPUnit\Framework\isEmpty;

class FileUploadController extends Controller
{

    public function fileUpload(Request $request)
    {
        try {
            $path       = env('AWS_S3_PATH');
            $file       = $request->file('userUpload');
            $imgName    = $file->getClientOriginalName();
            $bucket     = env('AWS_BUCKET');
            $region     = env('AWS_REGION');
            $url        = "https://{$bucket}.s3.{$region}.amazonaws.com{$path}{$imgName}";
            $userId     = Auth::user()['UserID'];
            $timeStamp  = Carbon::now()->format('Y-m-d H:i:s');
            $isUploaded = !empty($url) ? 1 : 0;


            $file->storeAs(
                $path, // Folder
                $imgName, // Name of image
                's3' // Disk Name
            );

            $data = [
                'url'        => $url,
                'UserID'     => $userId,
                'isUploaded' => $isUploaded,
                'timeStamp'  => $timeStamp
            ];

            Upload::create($data);

            return $data;

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

    }
}
