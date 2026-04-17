<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateWithApiToken
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (! $token) {
            return response()->json([
                'message' => 'Non authentifie.',
            ], 401);
        }

        $userId = Cache::get('auth_token:'.$token);
        $user = $userId ? User::find($userId) : null;

        if (! $user) {
            return response()->json([
                'message' => 'Token invalide ou expire.',
            ], 401);
        }

        $request->setUserResolver(static fn (): User => $user);

        return $next($request);
    }
}
