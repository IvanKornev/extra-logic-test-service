<?php

namespace App\Models\Concerns;
use Illuminate\Support\Str;

trait UuidIsPrimary
{
    protected static function bootUuidIsPrimary()
    {
        static::creating(function ($model) {
            if (!$model->getKey()) {
                $generatedUuid = (string)Str::uuid();
                $key = $model->getKeyName();
                $model->$key = $generatedUuid;
            }
        });
    }

    public function getIncrementing()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }
}
