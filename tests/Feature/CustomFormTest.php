<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Http;

use Tests\TestCase;

class CustomFormTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected string $url;

    protected function setUp(): void
    {
        parent::setUp();
        $this->url = env('APP_URL') . ':8000/api/custom-form';
        $this->setUpFaker();
    }

    public function testThatAddsForm()
    {
        $data = ['title' => $this->faker->title(), 'fields' => []];
        for ($i = 0; $i < 3; $i++) {
            $field = [
                'name' => $this->faker->title(),
                'description' => $this->faker->text(30),
                'type' => 'text'
            ];
            array_push($data['fields'], $field);
        }

        $response = Http::post($this->url, $data);
        var_dump($response->body());
        $this->assertTrue($response->ok());
    }
}
