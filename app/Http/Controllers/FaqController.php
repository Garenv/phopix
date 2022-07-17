<?php

namespace App\Http\Controllers;

use App\Models\Faq;

class FaqController extends Controller
{
    public function getFaq() {
        return Faq::get();
    }
}
