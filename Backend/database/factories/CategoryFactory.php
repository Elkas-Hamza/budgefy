<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    private const CATEGORY_META = [
        'Logement' => ['color_hex' => '#137fec', 'icon' => 'home'],
        'Alimentation' => ['color_hex' => '#10b981', 'icon' => 'restaurant'],
        'Transport' => ['color_hex' => '#f59e0b', 'icon' => 'local_gas_station'],
        'Loisirs' => ['color_hex' => '#8b5cf6', 'icon' => 'sports_esports'],
        'Sante' => ['color_hex' => '#ef4444', 'icon' => 'health_and_safety'],
        'Salaire' => ['color_hex' => '#06b6d4', 'icon' => 'payments'],
        'Freelance' => ['color_hex' => '#22c55e', 'icon' => 'work'],
        'Autres' => ['color_hex' => '#94a3b8', 'icon' => 'label'],
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->randomElement(array_keys(self::CATEGORY_META));

        return [
            'name' => $name,
            'color_hex' => self::CATEGORY_META[$name]['color_hex'],
            'icon' => self::CATEGORY_META[$name]['icon'],
        ];
    }
}
