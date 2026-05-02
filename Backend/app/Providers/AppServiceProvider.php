<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(static function (object $notifiable, string $url): MailMessage {
            return (new MailMessage)
                ->subject('Confirmez votre adresse email - Budgefy')
                ->greeting('Bonjour !')
                ->line('Merci d\'avoir cree un compte sur Budgefy.')
                ->line('Veuillez confirmer votre adresse email pour activer toutes les fonctionnalites.')
                ->action('Verifier mon email', $url)
                ->line('Si vous n\'etes pas a l\'origine de cette inscription, vous pouvez ignorer cet email.');
        });

        VerifyEmail::createUrlUsing(static function (object $notifiable): string {
            $verificationUrl = URL::temporarySignedRoute(
                'verification.verify',
                now()->addMinutes(60),
                [
                    'id' => $notifiable->getKey(),
                    'hash' => sha1($notifiable->getEmailForVerification()),
                ]
            );

            $frontendUrl = rtrim((string) config('app.frontend_url'), '/');

            if ($frontendUrl === '') {
                return $verificationUrl;
            }

            return $frontendUrl.'/verify-email?url='.urlencode($verificationUrl);
        });
    }
}
