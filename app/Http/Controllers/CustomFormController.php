<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Facades\CustomFormFacade;

class CustomFormController extends Controller
{
    private CustomFormFacade $customForm;

    public function __construct(CustomFormFacade $customForm)
    {
        $this->customForm = $customForm;        
    }

    public function store(Request $request)
    {
      $formData = collect([...$request->json()->all()]);
      $storedForm = $this->customForm->create($formData);
      return response($storedForm->toJson());   
    }
}
