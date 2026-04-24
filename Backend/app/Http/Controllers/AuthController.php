<?php

namespace App\Http\Controllers;

use App\Models\User;
use Database\Seeders\FinanceSeeder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $imageUrl = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('avatars', 'public');
            $imageUrl = Storage::disk('public')->url($imagePath);
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'image' => $imageUrl,
            'password' => $validated['password'],
        ]);

        (new FinanceSeeder)->seedForUser($user);

        $token = $this->issueToken($user->id);

        return response()->json([
            'message' => 'Compte cree avec succes.',
            'token' => $token,
            'user' => $user,
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Identifiants invalides.'],
            ]);
        }

        $token = $this->issueToken($user->id);

        return response()->json([
            'message' => 'Connexion reussie.',
            'token' => $token,
            'user' => $user,
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $token = $request->bearerToken();
        $user = $token ? $this->resolveUserFromToken($token) : null;

        if (! $user) {
            return response()->json([
                'message' => 'Non authentifie.',
            ], 401);
        }

        return response()->json([
            'user' => $user,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $token = $request->bearerToken();

        if ($token) {
            Cache::forget($this->tokenCacheKey($token));
        }

        return response()->json([
            'message' => 'Deconnexion reussie.',
        ]);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();

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
            'image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'remove_image' => ['nullable', 'boolean'],
        ]);

        if (array_key_exists('name', $validated)) {
            $user->name = $validated['name'];
        }

        if (array_key_exists('email', $validated)) {
            $user->email = $validated['email'];
        }

        if (($validated['remove_image'] ?? false) === true) {
            $this->deleteStoredAvatarIfPossible($user->image);
            $user->image = null;
        }

        if ($request->hasFile('image')) {
            $this->deleteStoredAvatarIfPossible($user->image);
            $imagePath = $request->file('image')->store('avatars', 'public');
            $user->image = Storage::disk('public')->url($imagePath);
        }

        $user->save();

        return response()->json([
            'message' => 'Profil mis a jour.',
            'user' => $user,
        ]);
    }

    private function issueToken(int $userId): string
    {
        $token = Str::random(80);

        Cache::put($this->tokenCacheKey($token), $userId, now()->addDay());

        return $token;
    }

    private function resolveUserFromToken(string $token): ?User
    {
        $userId = Cache::get($this->tokenCacheKey($token));

        if (! $userId) {
            return null;
        }

        return User::find($userId);
    }

    private function tokenCacheKey(string $token): string
    {
        return 'auth_token:'.$token;
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
