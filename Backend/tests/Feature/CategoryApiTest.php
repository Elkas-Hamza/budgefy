<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_category_crud_flow_works_for_authenticated_user(): void
    {
        $email = 'category-user-'.uniqid().'@example.com';

        $registerResponse = $this->postJson('/api/auth/register', [
            'name' => 'Category User',
            'email' => $email,
            'password' => 'password123',
        ]);

        $registerResponse->assertCreated();

        $token = $registerResponse->json('token');

        $this->assertIsString($token);

        $headers = [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer '.$token,
        ];

        $indexResponse = $this->getJson('/api/categories', $headers);

        $indexResponse->assertOk();
        $indexResponse->assertJsonStructure([
            'categories' => [
                [
                    'id',
                    'name',
                    'color_hex',
                    'transactions_count',
                ],
            ],
        ]);

        $createResponse = $this->postJson('/api/categories', [
            'name' => 'Travel',
            'color_hex' => '#112233',
        ], $headers);

        $createResponse->assertCreated();
        $createResponse->assertJsonPath('category.name', 'Travel');

        $categoryId = $createResponse->json('category.id');

        $updateResponse = $this->putJson('/api/categories/'.$categoryId, [
            'name' => 'Travel Updated',
            'color_hex' => '#445566',
        ], $headers);

        $updateResponse->assertOk();
        $updateResponse->assertJsonPath('category.name', 'Travel Updated');

        $deleteResponse = $this->deleteJson('/api/categories/'.$categoryId, [], $headers);

        $deleteResponse->assertOk();
    }
}
