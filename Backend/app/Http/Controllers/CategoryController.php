<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    private const ALLOWED_ICONS = [
        'label',
        'travel',
        'shopping_cart',
        'restaurant',
        'local_gas_station',
        'sports_esports',
        'movie',
        'subscriptions',
        'school',
        'health_and_safety',
        'home',
        'work',
        'savings',
        'payments',
    ];

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $categories = Category::query()
            ->withCount('transactions')
            ->where('user_id', $user->id)
            ->orderBy('name')
            ->get(['id', 'name', 'color_hex', 'icon']);

        return response()->json([
            'categories' => $categories->map(fn (Category $category): array => [
                'id' => $category->id,
                'name' => $category->name,
                'color_hex' => $category->color_hex,
                'icon' => $category->icon,
                'transactions_count' => $category->transactions_count,
            ]),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'color_hex' => ['nullable', 'string', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'icon' => ['nullable', 'string', Rule::in(self::ALLOWED_ICONS)],
        ]);

        $category = Category::create([
            'user_id' => $user->id,
            'name' => $validated['name'],
            'color_hex' => $validated['color_hex'] ?? null,
            'icon' => $validated['icon'] ?? 'label',
        ]);

        return response()->json([
            'message' => 'Category created successfully.',
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'color_hex' => $category->color_hex,
                'icon' => $category->icon,
                'transactions_count' => 0,
            ],
        ], 201);
    }

    public function update(Request $request, Category $category): JsonResponse
    {
        $user = $request->user();

        if ($category->user_id !== $user->id) {
            return response()->json([
                'message' => 'Category not found.',
            ], 404);
        }

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'color_hex' => ['nullable', 'string', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'icon' => ['sometimes', 'nullable', 'string', Rule::in(self::ALLOWED_ICONS)],
        ]);

        $category->update($validated);
        $category->loadCount('transactions');

        return response()->json([
            'message' => 'Category updated successfully.',
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'color_hex' => $category->color_hex,
                'icon' => $category->icon,
                'transactions_count' => $category->transactions_count,
            ],
        ]);
    }

    public function destroy(Request $request, Category $category): JsonResponse
    {
        $user = $request->user();

        if ($category->user_id !== $user->id) {
            return response()->json([
                'message' => 'Category not found.',
            ], 404);
        }

        if ($category->transactions()->exists()) {
            return response()->json([
                'message' => 'Cannot delete a category that still has transactions.',
            ], 422);
        }

        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully.',
        ]);
    }
}
