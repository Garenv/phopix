<?php

namespace App\Dal\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Uploads extends Model implements Transformable
{
    use TransformableTrait;
    protected $table = "uploads";
    protected $primaryKey = "UserID";

}
