<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileUploadController extends Controller
{
    public function fileUpload(Request $request) {
        if($request->hasFile('userUpload')) {
            $file = $request->file('userUpload');
            $fileName = $file->getClientOriginalName();
            $fileSize = $file->getSize()/1024/1024;
            $filePath = "/assets/images/phopix/user/";


            Storage::disk('s3')->put($filePath, file_get_contents($file));
            Storage::disk('s3')->url($filePath);

            return "success";
        }
    }
}
