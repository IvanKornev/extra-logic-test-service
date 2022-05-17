<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

use Tests\TestCase;
use App\Facades\CustomFormFacade;

class CustomFormTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function addsForm()
    {
        $data = collect([
            'title' => 'Новая форма',
            'fields' => [
                ['name' => 'Имя', 'description' => 'Имя юзера', 'type' => 'text'],
                ['name' => 'Имя', 'description' => 'Имя юзера', 'type' => 'text'],
                ['name' => 'Имя', 'description' => 'Имя юзера', 'type' => 'text'],
            ],
        ]);
        $facade = new CustomFormFacade;
        $createdForm = $facade->create($data);
        $this->assertEquals('Новая форма', $createdForm->title);
    }
}
