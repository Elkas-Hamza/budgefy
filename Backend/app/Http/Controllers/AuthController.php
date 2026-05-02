<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\AccountDeletionConfirmationNotification;
use App\Notifications\PasswordResetCodeNotification;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
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
            $imageUrl = Storage::url($imagePath);
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'image' => $imageUrl,
            'password' => $validated['password'],
        ]);

        $user->sendEmailVerificationNotification();

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

    public function deleteAccount(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();
        $token = $request->bearerToken();

        if (! Cache::get($this->accountDeletionConfirmedCacheKey($user->id))) {
            return response()->json([
                'message' => 'Confirmation de suppression requise via email.',
            ], 403);
        }

        $user->transactions()->delete();
        $user->categories()->delete();
        $this->deleteStoredAvatarIfPossible($user->image);
        $user->delete();

        if ($token) {
            Cache::forget($this->tokenCacheKey($token));
        }

        Cache::forget($this->accountDeletionRequestTokenCacheKey($user->id));
        Cache::forget($this->accountDeletionConfirmedCacheKey($user->id));

        return response()->json([
            'message' => 'Compte supprime avec succes.',
        ]);
    }

    public function requestAccountDeletion(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $deletionToken = Str::random(64);

        Cache::put($this->accountDeletionRequestTokenCacheKey($user->id), $deletionToken, now()->addMinutes(30));
        Cache::forget($this->accountDeletionConfirmedCacheKey($user->id));

        $verificationUrl = URL::temporarySignedRoute(
            'account.deletion.verify',
            now()->addMinutes(30),
            [
                'id' => $user->id,
                'hash' => sha1($user->email),
                'token' => $deletionToken,
            ]
        );

        $frontendUrl = rtrim((string) ($request->headers->get('origin') ?: config('app.frontend_url')), '/');
        $frontendConfirmationUrl = $frontendUrl !== ''
            ? $frontendUrl.'/confirm-account-deletion?url='.urlencode($verificationUrl)
            : '/confirm-account-deletion?url='.urlencode($verificationUrl);

        $user->notify(new AccountDeletionConfirmationNotification($verificationUrl, $frontendConfirmationUrl));

        return response()->json([
            'message' => 'Un email de confirmation de suppression a ete envoye.',
        ]);
    }

    public function verifyAccountDeletion(Request $request, int $id, string $hash): JsonResponse
    {
        $token = (string) $request->query('token', '');
        $user = User::find($id);

        if (! $user instanceof User || ! hash_equals($hash, sha1($user->email))) {
            return response()->json([
                'message' => 'Lien de confirmation invalide.',
            ], 403);
        }

        $expectedToken = Cache::get($this->accountDeletionRequestTokenCacheKey($user->id));

        if (! is_string($expectedToken) || $expectedToken === '' || ! hash_equals($expectedToken, $token)) {
            return response()->json([
                'message' => 'Lien de confirmation invalide ou expire.',
            ], 403);
        }

        Cache::put($this->accountDeletionConfirmedCacheKey($user->id), true, now()->addMinutes(30));

        return response()->json([
            'message' => 'Suppression confirmee. Retournez a l\'application pour finaliser.',
            'user' => [
                'name' => $user->name,
                'image' => $user->image,
            ],
        ]);
    }

    public function previewAccountDeletion(Request $request, int $id, string $hash): JsonResponse
    {
        $token = (string) $request->query('token', '');
        $user = User::find($id);

        if (! $user instanceof User || ! hash_equals($hash, sha1($user->email))) {
            return response()->json([
                'message' => 'Lien de confirmation invalide.',
            ], 403);
        }

        $expectedToken = Cache::get($this->accountDeletionRequestTokenCacheKey($user->id));

        if (! is_string($expectedToken) || $expectedToken === '' || ! hash_equals($expectedToken, $token)) {
            return response()->json([
                'message' => 'Lien de confirmation invalide ou expire.',
            ], 403);
        }

        return response()->json([
            'user' => [
                'name' => $user->name,
                'image' => $user->image,
            ],
        ]);
    }

    public function accountDeletionStatus(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();
        $confirmed = (bool) Cache::get($this->accountDeletionConfirmedCacheKey($user->id), false);

        return response()->json([
            'confirmed' => $confirmed,
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
            $nextEmail = $validated['email'];

            if ($nextEmail !== $user->email) {
                $user->email_verified_at = null;
            }

            $user->email = $nextEmail;
        }

        if ($request->boolean('remove_image')) {
            $this->deleteStoredAvatarIfPossible($user->image);
            $user->image = null;
        }

        if ($request->hasFile('image')) {
            $this->deleteStoredAvatarIfPossible($user->image);
            $imagePath = $request->file('image')->store('avatars', 'public');
            $user->image = Storage::url($imagePath);
        }

        $user->save();

        return response()->json([
            'message' => 'Profil mis a jour.',
            'user' => $user,
        ]);
    }

    public function changePassword(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $validated = $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if (! Hash::check($validated['current_password'], $user->password)) {
            return response()->json([
                'message' => 'Le mot de passe actuel est incorrect.',
            ], 422);
        }

        if (Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Le nouveau mot de passe doit etre different.',
            ], 422);
        }

        $user->password = $validated['password'];
        $user->save();

        return response()->json([
            'message' => 'Mot de passe modifie avec succes.',
        ]);
    }

    public function sendEmailVerificationNotification(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Adresse email deja verifiee.',
            ]);
        }

        $user->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Lien de verification envoye.',
        ]);
    }

    public function requestEmailVerificationLink(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if ($user instanceof User && ! $user->hasVerifiedEmail()) {
            $user->sendEmailVerificationNotification();
        }

        return response()->json([
            'message' => 'Si ce compte existe et n\'est pas verifie, un lien de verification a ete envoye.',
        ]);
    }

    public function verifyEmail(Request $request, int $id, string $hash): JsonResponse
    {
        $user = User::find($id);

        if (! $user instanceof User || ! hash_equals((string) $hash, sha1($user->email))) {
            return response()->json([
                'message' => 'Lien de verification invalide.',
            ], 403);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Adresse email deja verifiee.',
            ]);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return response()->json([
            'message' => 'Adresse email verifiee avec succes.',
        ]);
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if ($user instanceof User) {
            $cacheKey = $this->passwordResetCodeCacheKey($user->email);

            if (Cache::has($cacheKey)) {
                return response()->json([
                    'message' => 'Un code de reinitialisation a deja ete envoye. Veuillez patienter 10 minutes avant de reessayer.',
                    'retry_after_minutes' => 10,
                ], 429);
            }

            $code = (string) random_int(100000, 999999);

            Cache::put($cacheKey, ['hash' => Hash::make($code)], now()->addMinutes(10));

            $user->notify(new PasswordResetCodeNotification($code));
        }

        return response()->json([
            'message' => 'Si ce compte existe, un code de reinitialisation valide 10 minutes a ete envoye.',
        ]);
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email'],
            'code' => ['required', 'string', 'size:6'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::where('email', $validated['email'])->first();
        $payload = Cache::get($this->passwordResetCodeCacheKey($validated['email']));

        if (! $user instanceof User || ! is_array($payload) || ! isset($payload['hash']) || ! is_string($payload['hash']) || ! Hash::check($validated['code'], $payload['hash'])) {
            return response()->json([
                'message' => 'Le code de reinitialisation est invalide ou expire.',
            ], 422);
        }

        $user->forceFill([
            'password' => $validated['password'],
            'remember_token' => Str::random(60),
        ])->save();

        Cache::forget($this->passwordResetCodeCacheKey($validated['email']));

        event(new PasswordReset($user));

        return response()->json([
            'message' => 'Mot de passe reinitialise avec succes.',
        ]);
    }

    public function verifyResetCode(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email'],
            'code' => ['required', 'string', 'size:6'],
        ]);

        $payload = Cache::get($this->passwordResetCodeCacheKey($validated['email']));

        if (! is_array($payload) || ! isset($payload['hash']) || ! is_string($payload['hash']) || ! Hash::check($validated['code'], $payload['hash'])) {
            return response()->json([
                'valid' => false,
                'message' => 'Le code de reinitialisation est invalide ou expire.',
            ], 422);
        }

        return response()->json([
            'valid' => true,
            'message' => 'Code de reinitialisation valide.',
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

    private function passwordResetCodeCacheKey(string $email): string
    {
        return 'password_reset_code:'.sha1(strtolower($email));
    }

    private function accountDeletionRequestTokenCacheKey(int $userId): string
    {
        return 'account_delete_request_token:'.$userId;
    }

    private function accountDeletionConfirmedCacheKey(int $userId): string
    {
        return 'account_delete_confirmed:'.$userId;
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
