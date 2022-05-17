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

    public function get(string $uuid): Form
    {
        return $this->form::findOrFail($uuid);
    }

    public function create($title): Form
    {
        $createdForm = $this->form::create([
            'title' => $title,
        ]);
        return $createdForm;
    }
}
