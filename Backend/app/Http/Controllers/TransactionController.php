<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TransactionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $query = Transaction::query()
            ->with('category:id,name,color_hex')
            ->where('user_id', $user->id)
            ->orderByDesc('occurred_at');

        $query = $this->applyFilters($query, $request);

        $summaryQuery = clone $query;
        $incomeTotal = (clone $summaryQuery)->where('type', 'income')->sum('amount');
        $expenseTotal = (clone $summaryQuery)->where('type', 'expense')->sum('amount');

        $paginator = $query->paginate(12)->withQueryString();

        $categories = Category::query()
            ->where('user_id', $user->id)
            ->orderBy('name')
            ->get(['id', 'name', 'color_hex']);

        return response()->json([
            'summary' => [
                'income_total' => round((float) $incomeTotal, 2),
                'expense_total' => round((float) $expenseTotal, 2),
                'net_balance' => round((float) $incomeTotal - (float) $expenseTotal, 2),
            ],
            'filters' => [
                'search' => (string) $request->query('search', ''),
                'type' => (string) $request->query('type', ''),
                'period' => (string) $request->query('period', 'this_month'),
                'category_id' => $request->query('category_id'),
            ],
            'categories' => $categories,
            'transactions' => $paginator->getCollection()
                ->map(fn (Transaction $transaction): array => $this->transformTransaction($transaction))
                ->values()
                ->all(),
            'pagination' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
            ],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'category_id' => [
                'nullable',
                'integer',
                Rule::exists('categories', 'id')->where(static fn (QueryBuilder $builder): QueryBuilder => $builder->where('user_id', $user->id)),
            ],
            'description' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'numeric', 'gt:0'],
            'type' => ['required', Rule::in(['income', 'expense'])],
            'status' => ['sometimes', Rule::in(['completed', 'pending'])],
            'occurred_at' => ['required', 'date'],
            'notes' => ['nullable', 'string'],
        ]);

        $transaction = Transaction::create([
            ...$validated,
            'user_id' => $user->id,
            'status' => $validated['status'] ?? 'completed',
        ])->load('category:id,name,color_hex');

        return response()->json([
            'message' => 'Transaction created successfully.',
            'transaction' => $this->transformTransaction($transaction),
        ], 201);
    }

    public function update(Request $request, Transaction $transaction): JsonResponse
    {
        $user = $request->user();

        if ($transaction->user_id !== $user->id) {
            return response()->json([
                'message' => 'Transaction not found.',
            ], 404);
        }

        $validated = $request->validate([
            'category_id' => [
                'nullable',
                'integer',
                Rule::exists('categories', 'id')->where(static fn (QueryBuilder $builder): QueryBuilder => $builder->where('user_id', $user->id)),
            ],
            'description' => ['sometimes', 'required', 'string', 'max:255'],
            'amount' => ['sometimes', 'required', 'numeric', 'gt:0'],
            'type' => ['sometimes', 'required', Rule::in(['income', 'expense'])],
            'status' => ['sometimes', Rule::in(['completed', 'pending'])],
            'occurred_at' => ['sometimes', 'required', 'date'],
            'notes' => ['nullable', 'string'],
        ]);

        $transaction->update($validated);
        $transaction->load('category:id,name,color_hex');

        return response()->json([
            'message' => 'Transaction updated successfully.',
            'transaction' => $this->transformTransaction($transaction),
        ]);
    }

    public function destroy(Request $request, Transaction $transaction): JsonResponse
    {
        $user = $request->user();

        if ($transaction->user_id !== $user->id) {
            return response()->json([
                'message' => 'Transaction not found.',
            ], 404);
        }

        $transaction->delete();

        return response()->json([
            'message' => 'Transaction deleted successfully.',
        ]);
    }

    private function applyFilters($query, Request $request)
    {
        $search = trim((string) $request->query('search', ''));
        $type = (string) $request->query('type', '');
        $period = (string) $request->query('period', 'this_month');
        $categoryId = $request->query('category_id');

        if ($search !== '') {
            $query->where(function ($builder) use ($search): void {
                $builder
                    ->where('description', 'like', "%{$search}%")
                    ->orWhere('notes', 'like', "%{$search}%");
            });
        }

        if (in_array($type, ['income', 'expense'], true)) {
            $query->where('type', $type);
        }

        if (is_numeric($categoryId)) {
            $query->where('category_id', (int) $categoryId);
        }

        if ($period === 'this_month') {
            $query->whereBetween('occurred_at', [now()->startOfMonth(), now()->endOfMonth()]);
        } elseif ($period === 'last_month') {
            $query->whereBetween('occurred_at', [
                now()->subMonthNoOverflow()->startOfMonth(),
                now()->subMonthNoOverflow()->endOfMonth(),
            ]);
        } elseif ($period === 'this_year') {
            $query->whereYear('occurred_at', now()->year);
        }

        return $query;
    }

    private function transformTransaction(Transaction $transaction): array
    {
        return [
            'id' => $transaction->id,
            'description' => $transaction->description,
            'amount' => round((float) $transaction->amount, 2),
            'type' => $transaction->type,
            'status' => $transaction->status,
            'notes' => $transaction->notes,
            'occurred_at' => $transaction->occurred_at?->toIso8601String(),
            'category' => $transaction->category
                ? [
                    'id' => $transaction->category->id,
                    'name' => $transaction->category->name,
                    'color_hex' => $transaction->category->color_hex,
                ]
                : null,
        ];
    }
}
