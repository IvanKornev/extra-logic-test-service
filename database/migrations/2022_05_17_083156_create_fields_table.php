<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('fields', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->enum('type', ['textarea', 'text', 'select']);
            $table->foreignUuid('form_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('fields');
    }
};
