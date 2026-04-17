<?php

namespace App\Http\Controllers;

use App\Models\User;
use Database\Seeders\FinanceSeeder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
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
}
