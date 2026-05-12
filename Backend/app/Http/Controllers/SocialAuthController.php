<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class SocialAuthController extends Controller
{
    private array $allowed = ['google'];

    public function redirect(Request $request, string $provider)
    {
        if (! in_array($provider, $this->allowed, true)) {
            abort(404);
        }

        $clientId = config('services.'.$provider.'.client_id');
        $clientSecret = config('services.'.$provider.'.client_secret');

        if (! is_string($clientId) || $clientId === '' || ! is_string($clientSecret) || $clientSecret === '') {
            abort(500, ucfirst($provider).' login is not configured. Please set the OAuth client id and secret in the backend environment.');
        }

        $origin = (string) $request->query('origin', config('app.frontend_url'));
        session(['social_origin' => $origin]);

        // Requires laravel/socialite package. See README for installation.
        return Socialite::driver($provider)->redirect();
    }

    public function callback(Request $request, string $provider)
    {
        if (! in_array($provider, $this->allowed, true)) {
            abort(404);
        }

        $clientId = config('services.'.$provider.'.client_id');
        $clientSecret = config('services.'.$provider.'.client_secret');

        if (! is_string($clientId) || $clientId === '' || ! is_string($clientSecret) || $clientSecret === '') {
            abort(500, ucfirst($provider).' login is not configured. Please set the OAuth client id and secret in the backend environment.');
        }

        // Socialite will set user details after redirect
        $socialUser = Socialite::driver($provider)->user();

        $email = $socialUser->getEmail();
        $socialId = $socialUser->getId();

        $user = null;

        if ($email) {
            $user = User::where('email', $email)->first();
        }

        if (! $user) {
            $user = User::where('provider', $provider)->where('provider_id', $socialId)->first();
        }

        if (! $user) {
            $user = User::create([
                'name' => $socialUser->getName() ?? $email ?? 'User',
                'email' => $email,
                'image' => $socialUser->getAvatar(),
                'password' => Str::random(24),
                'provider' => $provider,
                'provider_id' => $socialId,
            ]);
            if ($user && method_exists($user, 'sendEmailVerificationNotification')) {
                $user->sendEmailVerificationNotification();
            }
        } else {
            // ensure provider info is stored
            $updated = false;
            if (! $user->provider || ! $user->provider_id) {
                $user->provider = $provider;
                $user->provider_id = $socialId;
                $updated = true;
            }
            if (! $user->image && $socialUser->getAvatar()) {
                $user->image = $socialUser->getAvatar();
                $updated = true;
            }
            if ($updated) {
                $user->save();
            }
        }

        // Issue token (compatible with AuthController::issueToken)
        $token = Str::random(80);
        Cache::put('auth_token:'.$token, $user->id, now()->addDay());

        $origin = session('social_origin', config('app.frontend_url'));

        return view('social.callback', [
            'token' => $token,
            'origin' => $origin,
        ]);
    }
}
