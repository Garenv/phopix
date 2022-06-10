<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Uploads extends Model
{

    use HasApiTokens, HasFactory, Notifiable;

    // Despite not needed updated_at column, I was forced to include it in the table
    // Not sure why the below lines didn't let me bypass incrementing likes without
    // the need of updated_at.  Will need to check why later on down the line.
    public $timestamps = false;
    const UPDATED_AT = null;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'UserID',
        'url',
        'isUploaded',
        'timeStamp',
        'likes',
        'dislikes'
    ];
}
