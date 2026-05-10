<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class TrackActiveUsers
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if ($token) {
            $cacheKey = 'auth_token:' . $token;
            $userId = cache($cacheKey);

            if ($userId) {
                $user = User::find($userId);

                if ($user) {
                    $this->trackActiveUser($user);
                }
            }
        }

        return $next($request);
    }

    private function trackActiveUser(User $user): void
    {
        $activeUsers = Cache::get('active_users', []);

        $userKey = 'user_' . $user->id;
        $activeUsers[$userKey] = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'last_seen' => now()->toISOString(),
            'is_admin' => $user->is_admin,
        ];

        // Remove users inactive for more than 5 minutes
        $fiveMinutesAgo = now()->subMinutes(5)->toISOString();
        $activeUsers = array_filter($activeUsers, function ($userData) use ($fiveMinutesAgo) {
            return $userData['last_seen'] > $fiveMinutesAgo;
        });

        Cache::put('active_users', $activeUsers, now()->addMinutes(10));
    }
}
