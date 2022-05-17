<?php

namespace App\Services;

use Illuminate\Support\Collection;
use App\Models\Form;

final class FormService
{
    private Form $form;

    public function __construct(Form $form)
    {
      $this->form = $form;  
    }

    public function get(string $uuid): Collection
    {
        return $this->form::with('fields')->where('id', $uuid)->get();
    }

    public function create($title): Form
    {
        $createdForm = $this->form::create([
            'title' => $title,
        ]);
        return $createdForm;
    }
}
