<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class DashboardController extends Controller
{
    public function overview(Request $request): JsonResponse
    {
        $user = $request->user();

        $transactions = Transaction::query()
            ->with('category:id,name,color_hex')
            ->where('user_id', $user->id)
            ->orderByDesc('occurred_at')
            ->get();

        $incomeTotal = $transactions
            ->where('type', 'income')
            ->where('status', 'completed')
            ->sum('amount');
        $expenseTotal = $transactions
            ->where('type', 'expense')
            ->where('status', 'completed')
            ->sum('amount');

        $monthlyTrends = $this->buildMonthlyTrends($transactions);
        $categoryBreakdown = $this->buildCategoryBreakdown($transactions);
        $recentTransactions = $this->buildRecentTransactions($transactions);

        $periodDate = now();

        return response()->json([
            'summary' => [
                'current_balance' => round($incomeTotal - $expenseTotal, 2),
                'income_total' => round($incomeTotal, 2),
                'expense_total' => round($expenseTotal, 2),
            ],
            'period' => [
                'month' => (int) $periodDate->format('m'),
                'year' => (int) $periodDate->format('Y'),
                'label' => 'Statistiques pour '.$periodDate->locale('fr_FR')->translatedFormat('F Y'),
            ],
            'monthly_trends' => $monthlyTrends,
            'category_breakdown' => $categoryBreakdown,
            'recent_transactions' => $recentTransactions,
        ]);
    }

    private function buildMonthlyTrends(Collection $transactions): array
    {
        $months = collect(range(5, 0))
            ->map(static fn (int $offset): Carbon => now()->startOfMonth()->subMonths($offset));

        return $months->map(function (Carbon $monthStart) use ($transactions): array {
            $monthKey = $monthStart->format('Y-m');

            $monthTransactions = $transactions
                ->filter(fn (Transaction $transaction): bool => $transaction->occurred_at->format('Y-m') === $monthKey)
                ->where('status', 'completed');

            return [
                'month_key' => $monthKey,
                'label' => Str::ucfirst($monthStart->locale('fr_FR')->translatedFormat('M')),
                'income' => round((float) $monthTransactions->where('type', 'income')->sum('amount'), 2),
                'expense' => round((float) $monthTransactions->where('type', 'expense')->sum('amount'), 2),
                'income_segments' => $this->buildTrendSegments($monthTransactions, 'income'),
                'expense_segments' => $this->buildTrendSegments($monthTransactions, 'expense'),
            ];
        })->values()->all();
    }

    private function buildTrendSegments(Collection $monthTransactions, string $type): array
    {
        return $monthTransactions
            ->where('type', $type)
            ->groupBy(static fn (Transaction $transaction): string => $transaction->category?->name ?? 'Autres')
            ->map(function (Collection $group, string $categoryName): array {
                return [
                    'category' => $categoryName,
                    'amount' => round((float) $group->sum('amount'), 2),
                ];
            })
            ->filter(static fn (array $segment): bool => $segment['amount'] > 0)
            ->sortByDesc('amount')
            ->values()
            ->all();
    }

    private function buildCategoryBreakdown(Collection $transactions): array
    {
        $expenseTransactions = $transactions
            ->where('type', 'expense')
            ->where('status', 'completed');

        $totalExpense = (float) $expenseTransactions->sum('amount');

        if ($totalExpense <= 0) {
            return [];
        }

        return $expenseTransactions
            ->groupBy(static function (Transaction $transaction): string {
                if ($transaction->category?->id) {
                    return 'id:'.$transaction->category->id;
                }

                return 'name:'.($transaction->category?->name ?? 'Autres');
            })
            ->map(function (Collection $group) use ($totalExpense): array {
                $first = $group->first();
                $amount = (float) $group->sum('amount');

                return [
                    'category_id' => $first?->category?->id,
                    'name' => $first?->category?->name ?? 'Autres',
                    'amount' => round($amount, 2),
                    'share_percentage' => round(($amount / $totalExpense) * 100, 2),
                    'color_hex' => $first?->category?->color_hex ?? '#94a3b8',
                ];
            })
            ->sortByDesc('amount')
            ->values()
            ->all();
    }

    private function buildRecentTransactions(Collection $transactions): array
    {
        return $transactions
            ->take(8)
            ->map(static function (Transaction $transaction): array {
                return [
                    'id' => $transaction->id,
                    'description' => $transaction->description,
                    'category' => $transaction->category?->name ?? 'Non classe',
                    'occurred_at' => $transaction->occurred_at->toIso8601String(),
                    'status' => $transaction->status,
                    'type' => $transaction->type,
                    'amount' => round((float) $transaction->amount, 2),
                ];
            })
            ->values()
            ->all();
    }
}
