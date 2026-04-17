<?php

namespace Database\Factories;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['income', 'expense']);

        return [
            'description' => $type === 'income'
                ? fake()->randomElement(['Virement salaire', 'Paiement client', 'Prime mensuelle'])
                : fake()->randomElement(['Courses alimentaires', 'Transport', 'Facture electricite', 'Restaurant']),
            'amount' => fake()->randomFloat(2, 20, 3200),
            'type' => $type,
            'status' => fake()->randomElement(['completed', 'completed', 'completed', 'pending']),
            'occurred_at' => fake()->dateTimeBetween('-6 months', 'now'),
            'notes' => fake()->boolean(35) ? fake()->sentence() : null,
        ];
    }
}
