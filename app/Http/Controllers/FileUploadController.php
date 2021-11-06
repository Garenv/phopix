<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FileUploadController extends Controller
{
    public function fileUpload(Request $request)
    {
        try {
            $path = "/assets/images/phopix/user/";
            $file = $request->file('userUpload');
            $imgName = $file->getClientOriginalName();

            $file->storeAs(
                $path, // Folder
                $imgName, // Name of image
                's3' // Disk Name
            );

            Storage::disk('s3')->temporaryUrl(
                $path . "/" . $imgName,
                now()->addMinutes(10)
            );


        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage(), $e->getCode(), $e);
        }

    }
}
