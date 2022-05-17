<?php

namespace App\Facades;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

use App\Services\{ FormService, FieldService };

class CustomFormFacade
{
    private FormService $form;
    private FieldService $field;

    public function __construct(FormService $form, FieldService $field)
    {
        $this->form = $form;
        $this->field = $field;
    }

    public function create(Collection $form)
    {
        $formId = DB::transaction(function() use($form) {
            $createdForm = $this->form->create($form->title);
            foreach($form->fields as $field) {
                $this->field->create($field, $createdForm->id);
            }
            return $createdForm->id;
        });
        return $this->form->get($formId);
    }
}
