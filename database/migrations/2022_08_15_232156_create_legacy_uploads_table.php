<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLegacyUploadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('legacy_uploads', function (Blueprint $table) {
            $table->string('UserID');
            $table->string('url');
            $table->boolean('isUploaded');
            $table->string('timeStamp');
            $table->integer('likes');
            $table->integerIncrements('uploadId')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('legacy_uploads');
    }
}
