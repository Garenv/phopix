<?php

namespace App\Http\Controllers;

use App\Dal\Interfaces\IUploadsRepository;
use App\Models\LegacyUploads;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;

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
            $path                     = env('AWS_S3_PATH');
            $file                     = $request->file('image');
            $imgName                  = $file->getClientOriginalName();
            $bucket                   = env('AWS_BUCKET');
            $region                   = env('AWS_REGION');
            $url                      = "https://{$bucket}.s3.{$region}.amazonaws.com{$path}{$imgName}";
            $userId                   = Auth::user()['UserID'];
            $time                     = Carbon::now();
            $timeStamp                = $time->toDateTimeString();
            $weekday                  = date("l");
            $photoId                  = 'p-' . Str::uuid()->toString();

            $getAllUploadsData        = $this->__uploadsRepository->getAllUploadsData();
            $isUploadsTableEmpty      = $getAllUploadsData->isEmpty();
            $checkIfUserHasUploaded   = $this->__uploadsRepository->checkIfUserHasUploaded($userId);

            $data = [
                'url'                 => $url,
                'UserID'              => $userId,
                'isUploaded'          => true,
                'timeStamp'           => $timeStamp,
                'photo_id'            => $photoId
            ];

            // If the uploads table is empty OR if there doesn't exist an upload record for the user at all
            // then carry out DB insertion/Redis Set/Store upload in S3 procedure
            if($isUploadsTableEmpty || $checkIfUserHasUploaded->isEmpty()) {
                $this->insertSetStoreAsset($file, $path, $imgName, $data);
                $data['message'] = "You've successfully uploaded a photo!";
                return response()->json($data);
            }

            $existingUploadedTimestamp = $checkIfUserHasUploaded[0]->timeStamp;

            // If it's NOT Wednesday AND the user has NOT uploaded any photo this week,
            // then carry out DB insertion/Redis Set/Store upload in S3 procedure
            // see this for more info: https://stackoverflow.com/a/30556359
            if($weekday !== 'Wednesday' && (date("W") !== date("W", strtotime($existingUploadedTimestamp)))) {
                $this->insertSetStoreAsset($file, $path, $imgName, $data);
                $data['message'] = "You've successfully uploaded a photo!";
                return response()->json($data);
            }

            return response()->json(['status' => 'failed', 'message' => "You have already uploaded a photo this week!"], 500);

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

    }

    public function insertSetStoreAsset($file, $path, $imgName, $data) {
        $file->storeAs(
            $path, // Folder
            $imgName, // Name of image
            's3' // Disk Name
        );

        DB::table('uploads')->insertGetId($data);
        LegacyUploads::create($data);
//        Redis::set("uploadId:$insertUploadDataAndGetUploadId", json_encode($data));
    }

}
