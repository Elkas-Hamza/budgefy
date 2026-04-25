<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class FinanceSeeder extends Seeder
{
    private const BASE_CATEGORIES = [
        ['name' => 'Logement', 'color_hex' => '#137fec', 'icon' => 'home'],
        ['name' => 'Alimentation', 'color_hex' => '#10b981', 'icon' => 'restaurant'],
        ['name' => 'Transport', 'color_hex' => '#f59e0b', 'icon' => 'local_gas_station'],
        ['name' => 'Loisirs', 'color_hex' => '#8b5cf6', 'icon' => 'sports_esports'],
        ['name' => 'Salaire', 'color_hex' => '#06b6d4', 'icon' => 'payments'],
        ['name' => 'Freelance', 'color_hex' => '#22c55e', 'icon' => 'work'],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::query()->each(function (User $user): void {
            $this->seedForUser($user);
        });
    }

    public function seedForUser(User $user): void
    {
        if ($user->transactions()->exists()) {
            return;
        }

        $categories = collect(self::BASE_CATEGORIES)
            ->mapWithKeys(function (array $categoryData) use ($user) {
                $category = Category::query()->firstOrCreate(
                    [
                        'user_id' => $user->id,
                        'name' => $categoryData['name'],
                    ],
                    [
                        'color_hex' => $categoryData['color_hex'],
                        'icon' => $categoryData['icon'],
                    ]
                );

                return [$category->name => $category];
            });

        foreach (range(0, 5) as $monthOffset) {
            $monthDate = now()->subMonths($monthOffset);
            $incomeBase = 2600 + random_int(0, 700);

            $this->createTransaction(
                $user,
                $categories['Salaire']->id,
                'Virement salaire',
                $incomeBase,
                'income',
                Carbon::parse($monthDate)->day(2)->setTime(9, 0)
            );

            $this->createTransaction(
                $user,
                $categories['Freelance']->id,
                'Mission freelance',
                random_int(250, 900),
                'income',
                Carbon::parse($monthDate)->day(18)->setTime(11, 30)
            );

            $this->createTransaction(
                $user,
                $categories['Logement']->id,
                'Loyer',
                random_int(650, 980),
                'expense',
                Carbon::parse($monthDate)->day(5)->setTime(8, 10)
            );

            $this->createTransaction(
                $user,
                $categories['Alimentation']->id,
                'Courses alimentaires',
                random_int(180, 420),
                'expense',
                Carbon::parse($monthDate)->day(12)->setTime(19, 20)
            );

            $this->createTransaction(
                $user,
                $categories['Transport']->id,
                'Carburant / transport',
                random_int(80, 220),
                'expense',
                Carbon::parse($monthDate)->day(20)->setTime(17, 35)
            );

            $this->createTransaction(
                $user,
                $categories['Loisirs']->id,
                'Sorties et loisirs',
                random_int(60, 240),
                'expense',
                Carbon::parse($monthDate)->day(25)->setTime(21, 5),
                random_int(0, 10) > 8 ? 'pending' : 'completed'
            );
        }

        Transaction::factory(10)
            ->for($user)
            ->for($categories['Alimentation'])
            ->state([
                'type' => 'expense',
                'status' => 'completed',
            ])
            ->create();
    }

    private function createTransaction(
        User $user,
        int $categoryId,
        string $description,
        int $amount,
        string $type,
        Carbon $occurredAt,
        string $status = 'completed'
    ): void {
        Transaction::query()->create([
            'user_id' => $user->id,
            'category_id' => $categoryId,
            'description' => $description,
            'amount' => $amount,
            'type' => $type,
            'status' => $status,
            'occurred_at' => $occurredAt,
            'notes' => null,
        ]);
    }
}
