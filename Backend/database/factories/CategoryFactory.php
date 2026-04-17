<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    private const CATEGORY_COLORS = [
        'Logement' => '#137fec',
        'Alimentation' => '#10b981',
        'Transport' => '#f59e0b',
        'Loisirs' => '#8b5cf6',
        'Sante' => '#ef4444',
        'Salaire' => '#06b6d4',
        'Freelance' => '#22c55e',
        'Autres' => '#94a3b8',
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->randomElement(array_keys(self::CATEGORY_COLORS));

        return [
            'name' => $name,
            'color_hex' => self::CATEGORY_COLORS[$name],
        ];
    }
}
