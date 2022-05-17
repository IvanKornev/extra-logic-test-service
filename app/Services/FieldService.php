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

    public function create(array $data, string $formUuid): void
    {
        $this->field::create([
            'form_id' => $formUuid, ...$data,
        ]);
    }
}
