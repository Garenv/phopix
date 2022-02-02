<?php

namespace App\Http\Controllers;

use App\Dal\Interfaces\IUsersRepository;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * @var IUsersRepository
     */
    protected $__usersRepository;

    public function __construct(IUsersRepository $usersRepository)
    {
        $this->__usersRepository = $usersRepository;
    }

    public function postUserLike(Request $request)
    {
        dd($request);
    }
}
