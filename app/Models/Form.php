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
    public $timestamps = ['created_at'];

    const UPDATED_AT = null;
}
