<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomFormController;

Route::resource('custom-form',  CustomFormController::class)->only([
    'store',
]);
