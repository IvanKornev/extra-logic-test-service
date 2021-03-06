<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $hidden = ['form_id'];
    protected $fillable = [
        'name',
        'description',
        'form_id',
        'type',
    ];
}
