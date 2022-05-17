<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Concerns\UuidIsPrimary;

class Form extends Model
{
    use HasFactory, UuidIsPrimary;

    protected $dateFormat = 'c';
    protected $fillable = [
        'title',
    ];
    public $timestamps = ['created_at'];

    const UPDATED_AT = null;
}
