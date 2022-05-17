<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $attributes = [
        'name',
        'description',
        'form_id',
        'type',
    ];
}
