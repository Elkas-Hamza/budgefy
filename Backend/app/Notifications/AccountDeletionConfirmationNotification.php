<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AccountDeletionConfirmationNotification extends Notification
{
    use Queueable;

    public function __construct(
        public readonly string $verificationUrl,
        public readonly string $frontendConfirmationUrl,
    ) {}

    /**
     * @return list<string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Confirmation de suppression du compte - Budgefy')
            ->greeting('Bonjour !')
            ->line('Vous avez demande la suppression de votre compte Budgefy.')
            ->line('Cliquez sur le bouton ci-dessous, puis confirmez la suppression sur la page ouverte.')
            ->action('Confirmer la suppression du compte', $this->frontendConfirmationUrl)
            ->line('Ce lien expire dans 30 minutes. Si vous n\'etes pas a l\'origine de cette demande, ignorez cet email.');
    }
}
