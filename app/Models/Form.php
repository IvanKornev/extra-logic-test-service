<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    use HasFactory;

    protected $dateFormat = 'c';
    protected $fillable = [
        'title',
    ];
    protected $attributes = [
        'delayed' => false,
    ];
}
