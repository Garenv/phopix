<?php

namespace App\Http\Controllers;

use App\Dal\Interfaces\IUploadsRepository;
use App\Models\LegacyUploads;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Str;
use Aws\Rekognition\RekognitionClient;

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
            $path                       = env('AWS_S3_PATH');
            $file                       = $request->file('image');
            $imgName                    = $file->getClientOriginalName();
            $bucket                     = env('AWS_BUCKET');
            $region                     = env('AWS_REGION');
            $url                        = "https://{$bucket}.s3.{$region}.amazonaws.com{$path}{$imgName}";
            $userId                     = Auth::user()['UserID'];
            $time                       = Carbon::now();
            $timeStamp                  = $time->toDateTimeString();
            $photoId                    = 'p-' . Str::uuid()->toString();
            $checkIfUserHasUploaded     = $this->__uploadsRepository->checkIfUserHasUploaded($userId);
            $isImageUploadedAppropriate = $this->isImageUploadedAppropriate(file_get_contents($file->path()));

            $data = [
                'url'                   => $url,
                'UserID'                => $userId,
                'isUploaded'            => true,
                'timeStamp'             => $timeStamp,
                'photo_id'              => $photoId
            ];

            if ($isImageUploadedAppropriate->getStatusCode() == 400) {
                return $isImageUploadedAppropriate;
            }

            if (count($checkIfUserHasUploaded) === 0) {
                $this->insertSetStoreAsset($file, $path, $imgName, $data);
                return $isImageUploadedAppropriate;
            }

            $existingUploadedTimestamp = $checkIfUserHasUploaded[0]->timeStamp;
            $weekday = date('l', strtotime($existingUploadedTimestamp));
            $currentWeekNumber = date('W');
            $uploadedWeekNumber = date('W', strtotime($existingUploadedTimestamp));

            if ($weekday !== 'Wednesday' && ($currentWeekNumber !== $uploadedWeekNumber)) {
                $this->insertSetStoreAsset($file, $path, $imgName, $data);
                return $isImageUploadedAppropriate;
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

    public function isImageUploadedAppropriate($file) {
        $rekognition = new RekognitionClient([
            'version' => 'latest',
            'region' => config('app.aws_region'),
            'credentials' => [
                'key' => config('app.aws_access_key'),
                'secret' => config('app.aws_secret_access_key')
            ],
        ]);

        $response = $rekognition->detectModerationLabels([
            'Image' => [
                'Bytes' => $file,
            ],
            'MinConfidence' => 50,
        ]);

        foreach ($response['ModerationLabels'] as $label) {
            switch ($label['Name']) {
                case 'Explicit Nudity':
                case 'Nudity':
                case 'Revealing Clothes':
                case 'Violence':
                case 'Hate Symbols':

                return Response::json([
                    'message' => "You may not upload an image that contains {$label['Name']}.",
                    'isInappropriate' => true
                ], 400);
            }
        }

        return Response::json([
            'message' => 'Image uploaded!',
            'isInappropriate' => false
        ], 200);

    }

}
