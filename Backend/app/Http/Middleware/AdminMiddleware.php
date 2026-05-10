<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Admin authentication required.'], 401);
        }

        $cacheKey = 'auth_token:' . $token;
        $userId = cache($cacheKey);

        if (!$userId) {
            return response()->json(['message' => 'Invalid or expired token.'], 401);
        }

        $user = User::find($userId);

        if (!$user || !$user->is_admin) {
            return response()->json(['message' => 'Admin access required.'], 403);
        }

        $request->setUserResolver(fn () => $user);

        return $next($request);
    }
}
