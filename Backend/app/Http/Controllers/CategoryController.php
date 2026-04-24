<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $categories = Category::query()
            ->withCount('transactions')
            ->where('user_id', $user->id)
            ->orderBy('name')
            ->get(['id', 'name', 'color_hex']);

        return response()->json([
            'categories' => $categories->map(fn (Category $category): array => [
                'id' => $category->id,
                'name' => $category->name,
                'color_hex' => $category->color_hex,
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
        ]);

        $category = Category::create([
            'user_id' => $user->id,
            'name' => $validated['name'],
            'color_hex' => $validated['color_hex'] ?? null,
        ]);

        return response()->json([
            'message' => 'Category created successfully.',
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'color_hex' => $category->color_hex,
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
        ]);

        $category->update($validated);
        $category->loadCount('transactions');

        return response()->json([
            'message' => 'Category updated successfully.',
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'color_hex' => $category->color_hex,
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
