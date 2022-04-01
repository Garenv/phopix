<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLegacyWinnersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('legacy_winners', function (Blueprint $table) {
            $table->string('UserID');
            $table->string('email');
            $table->string('place');
            $table->integer('likes');
            $table->string('winnerId');
            $table->string('url');
            $table->string('prizeId');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('legacy_winners');
    }
}
