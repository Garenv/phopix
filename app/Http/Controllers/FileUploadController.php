<?php

namespace App\Http\Controllers;

use App\Dal\Interfaces\IUploadsRepository;
use App\Models\Upload;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;

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

        try {
            $path             = env('AWS_S3_PATH');
            $file             = $request->file('image');
            $imgName          = $file->getClientOriginalName();
            $bucket           = env('AWS_BUCKET');
            $region           = env('AWS_REGION');
            $url              = "https://{$bucket}.s3.{$region}.amazonaws.com{$path}{$imgName}";
            $userId           = Auth::user()['UserID'];
            $time             = Carbon::now();
            $timeStamp        = $time->toDateTimeString();

            $file->storeAs(
                $path, // Folder
                $imgName, // Name of image
                's3' // Disk Name
            );

            $data = [
                'url'         => $url,
                'UserID'      => $userId,
                'isUploaded'  => true,
                'timeStamp'   => $timeStamp,
                'message'     => 'Successfully uploaded photo! 🙂'
            ];

            try {
                Upload::create($data);
            } catch(QueryException $e){
                $errorCode = $e->errorInfo[1];

                // If duplicate entry
                if($errorCode == 1062) {
                    return response()->json(['status' => 'failed', 'message' => 'You\'ve already uploaded a photo!'], 500);
                }
            }

            return $data;

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

    }

    public function getUploads()
    {
    }
}
