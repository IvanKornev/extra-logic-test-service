<?php

namespace App\Facades;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

use App\Services\{ FormService, FieldsService };

final class CustomFormFacade
{
    private FormService $form;
    private FieldsService $fields;

    public function __construct(FormService $form, FieldsService $fields)
    {
        $this->form = $form;
        $this->fields = $fields;
    }

    public function create(Collection $form)
    {
        $createdFormId = DB::transaction(function() use($form) {
            $this->form->create($form->title);
            $this->fields->insert($form->fields);
            return $this->form->id;
        });
        return $this->form->get($createdFormId);
    }
}
