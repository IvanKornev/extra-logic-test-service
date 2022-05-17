<?php

namespace App\Services;

use App\Models\Field;

final class FieldService
{
    private Field $field;

    public function __construct(Field $field)
    {
      $this->field = $field;  
    }

    public function create(array $data, int $formId): void
    {
        $this->field::create([
            'id' => $formId,
            ...$data,
        ]);
    }
}
