<?php

namespace App\Services;

use App\Models\Form;

final class FormService
{
    private Form $form;

    public function __construct(Form $form)
    {
      $this->form = $form;  
    }

    public function create(string $title): Form
    {
        $createdForm = $this->form::create([
            'title' => $title,
        ]);
        return $createdForm;
    }
}
