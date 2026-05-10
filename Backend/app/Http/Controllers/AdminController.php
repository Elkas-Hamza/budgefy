<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class AdminController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password) || ! $user->is_admin) {
            throw ValidationException::withMessages([
                'email' => ['Invalid admin credentials.'],
            ]);
        }

        $token = $this->issueToken($user->id);

        return response()->json([
            'message' => 'Admin login successful.',
            'token' => $token,
            'admin' => $user,
        ]);
    }

    public function getUsers(Request $request): JsonResponse
    {
        $users = User::withCount(['transactions', 'categories'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json([
            'users' => $users,
        ]);
    }

    public function getUser(Request $request, int $id): JsonResponse
    {
        $user = User::with(['transactions', 'categories'])->find($id);

        if (! $user) {
            return response()->json([
                'message' => 'User not found.',
            ], 404);
        }

        return response()->json([
            'user' => $user,
        ]);
    }

    public function createUser(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'is_admin' => ['boolean'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'is_admin' => $validated['is_admin'] ?? false,
        ]);

        return response()->json([
            'message' => 'User created successfully.',
            'user' => $user,
        ], 201);
    }

    public function updateUser(Request $request, int $id): JsonResponse
    {
        $user = User::find($id);

        if (! $user) {
            return response()->json([
                'message' => 'User not found.',
            ], 404);
        }

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => [
                'sometimes',
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'password' => ['sometimes', 'required', 'string', 'min:8'],
            'is_admin' => ['boolean'],
        ]);

        if (array_key_exists('name', $validated)) {
            $user->name = $validated['name'];
        }

        if (array_key_exists('email', $validated)) {
            $user->email = $validated['email'];
        }

        if (array_key_exists('password', $validated)) {
            $user->password = $validated['password'];
        }

        if (array_key_exists('is_admin', $validated)) {
            $user->is_admin = $validated['is_admin'];
        }

        $user->save();

        return response()->json([
            'message' => 'User updated successfully.',
            'user' => $user,
        ]);
    }

    public function deleteUser(Request $request, int $id): JsonResponse
    {
        $user = User::find($id);

        if (! $user) {
            return response()->json([
                'message' => 'User not found.',
            ], 404);
        }

        if ($user->id === $request->user()->id) {
            return response()->json([
                'message' => 'Cannot delete your own account.',
            ], 422);
        }

        $user->transactions()->delete();
        $user->categories()->delete();

        if ($user->image) {
            $this->deleteStoredAvatarIfPossible($user->image);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully.',
        ]);
    }

    public function getActiveUsers(Request $request): JsonResponse
    {
        $activeUsers = Cache::get('active_users', []);
        $count = count($activeUsers);

        return response()->json([
            'active_users_count' => $count,
            'active_users' => $activeUsers,
        ]);
    }

    public function getStats(Request $request): JsonResponse
    {
        $totalUsers = User::count();
        $adminUsers = User::where('is_admin', true)->count();
        $regularUsers = $totalUsers - $adminUsers;
        $activeUsers = Cache::get('active_users', []);
        $activeUsersCount = count($activeUsers);

        return response()->json([
            'total_users' => $totalUsers,
            'admin_users' => $adminUsers,
            'regular_users' => $regularUsers,
            'active_users_count' => $activeUsersCount,
            'active_users' => $activeUsers,
        ]);
    }

    private function issueToken(int $userId): string
    {
        $token = Str::random(80);

        Cache::put('auth_token:'.$token, $userId, now()->addDay());

        return $token;
    }

    private function deleteStoredAvatarIfPossible(?string $image): void
    {
        if (! $image) {
            return;
        }

        $path = parse_url($image, PHP_URL_PATH);

        if (! is_string($path) || ! str_starts_with($path, '/storage/')) {
            return;
        }

        Storage::disk('public')->delete(substr($path, strlen('/storage/')));
    }
}
