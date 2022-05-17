<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Http;

use Tests\TestCase;

class CustomFormTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function testThatAddsForm()
    {
        $data = collect([
            'title' => 'Новая форма',
            'fields' => [
                ['name' => 'Имя', 'description' => 'Имя юзера', 'type' => 'text'],
                ['name' => 'Имя', 'description' => 'Имя юзера', 'type' => 'text'],
                ['name' => 'Имя', 'description' => 'Имя юзера', 'type' => 'text'],
            ],
        ]);

        $appUrl = env('APP_URL');
        $fullUrl = "$appUrl:8000/api/custom-form";
        
        $response = Http::post($fullUrl, $data);
        $this->assertTrue($response->ok());
    }
}
