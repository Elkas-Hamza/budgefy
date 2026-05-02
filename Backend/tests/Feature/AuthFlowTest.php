<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use App\Notifications\AccountDeletionConfirmationNotification;
use App\Notifications\PasswordResetCodeNotification;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class AuthFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_request_email_verification_notification_when_authenticated(): void
    {
        Notification::fake();

        $user = User::factory()->unverified()->create([
            'password' => 'password123',
        ]);

        $loginResponse = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $loginResponse->assertOk();

        $token = $loginResponse->json('token');

        $headers = [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer '.$token,
        ];

        $response = $this->postJson('/api/auth/email/verification-notification', [], $headers);

        $response->assertOk();
        $response->assertJsonPath('message', 'Lien de verification envoye.');

        Notification::assertSentTo($user, VerifyEmail::class);
    }

    public function test_user_can_request_email_verification_link_by_email(): void
    {
        Notification::fake();

        $user = User::factory()->unverified()->create();

        $response = $this->postJson('/api/auth/email/verification-link', [
            'email' => $user->email,
        ]);

        $response->assertOk();
        $response->assertJsonPath('message', 'Si ce compte existe et n\'est pas verifie, un lien de verification a ete envoye.');

        Notification::assertSentTo($user, VerifyEmail::class);
    }

    public function test_verified_user_requesting_email_verification_link_does_not_send_notification(): void
    {
        Notification::fake();

        $user = User::factory()->create([
            'email_verified_at' => now(),
        ]);

        $response = $this->postJson('/api/auth/email/verification-link', [
            'email' => $user->email,
        ]);

        $response->assertOk();
        $response->assertJsonPath('message', 'Si ce compte existe et n\'est pas verifie, un lien de verification a ete envoye.');

        Notification::assertNotSentTo($user, VerifyEmail::class);
    }

    public function test_updating_email_marks_user_as_unverified(): void
    {
        $user = User::factory()->create([
            'password' => 'password123',
            'email_verified_at' => now(),
        ]);

        $loginResponse = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $loginResponse->assertOk();

        $token = $loginResponse->json('token');

        $response = $this->postJson(
            '/api/auth/profile',
            [
                'name' => 'Updated User',
                'email' => 'updated-'.uniqid().'@example.com',
            ],
            [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer '.$token,
            ]
        );

        $response->assertOk();
        $this->assertNull($user->fresh()->email_verified_at);
    }

    public function test_user_can_verify_email_from_signed_link(): void
    {
        Notification::fake();

        $email = 'verify-user-'.uniqid().'@example.com';

        $registerResponse = $this->postJson('/api/auth/register', [
            'name' => 'Verify User',
            'email' => $email,
            'password' => 'password123',
        ]);

        $registerResponse->assertCreated();

        $user = User::where('email', $email)->firstOrFail();

        Notification::assertSentTo($user, VerifyEmail::class);

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            [
                'id' => $user->id,
                'hash' => sha1($user->email),
            ]
        );

        $response = $this->getJson($verificationUrl);

        $response->assertOk();
        $response->assertJsonPath('message', 'Adresse email verifiee avec succes.');

        $this->assertNotNull($user->fresh()->email_verified_at);
    }

    public function test_user_can_reset_password_from_email_code(): void
    {
        Notification::fake();

        $user = User::factory()->create([
            'password' => 'old-password123',
        ]);

        $forgotPasswordResponse = $this->postJson('/api/auth/forgot-password', [
            'email' => $user->email,
        ]);

        $forgotPasswordResponse->assertOk();

        $secondForgotPasswordResponse = $this->postJson('/api/auth/forgot-password', [
            'email' => $user->email,
        ]);

        $secondForgotPasswordResponse->assertStatus(429);
        $secondForgotPasswordResponse->assertJsonPath('retry_after_minutes', 10);

        $code = null;

        Notification::assertSentTo(
            $user,
            PasswordResetCodeNotification::class,
            static function (PasswordResetCodeNotification $notification) use (&$code): bool {
                $code = $notification->code;

                return true;
            }
        );

        $this->assertIsString($code);

        $verifyCodeResponse = $this->postJson('/api/auth/verify-reset-code', [
            'email' => $user->email,
            'code' => $code,
        ]);

        $verifyCodeResponse->assertOk();
        $verifyCodeResponse->assertJsonPath('valid', true);
        $verifyCodeResponse->assertJsonPath('message', 'Code de reinitialisation valide.');

        $resetPasswordResponse = $this->postJson('/api/auth/reset-password', [
            'email' => $user->email,
            'code' => $code,
            'password' => 'new-password123',
            'password_confirmation' => 'new-password123',
        ]);

        $resetPasswordResponse->assertOk();
        $resetPasswordResponse->assertJsonPath('message', 'Mot de passe reinitialise avec succes.');

        $this->assertTrue(Hash::check('new-password123', $user->fresh()->password));
    }

    public function test_user_can_remove_profile_image(): void
    {
        $user = User::factory()->create([
            'password' => 'password123',
            'image' => '/storage/avatars/existing-avatar.png',
        ]);

        $loginResponse = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $loginResponse->assertOk();

        $token = $loginResponse->json('token');

        $response = $this->postJson(
            '/api/auth/profile',
            [
                'remove_image' => '1',
            ],
            [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer '.$token,
            ]
        );

        $response->assertOk();
        $response->assertJsonPath('user.image', null);
        $this->assertNull($user->fresh()->image);
    }

    public function test_user_can_change_password_when_current_password_is_valid(): void
    {
        $user = User::factory()->create([
            'password' => 'password123',
        ]);

        $loginResponse = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $loginResponse->assertOk();

        $token = $loginResponse->json('token');

        $response = $this->postJson(
            '/api/auth/change-password',
            [
                'current_password' => 'password123',
                'password' => 'new-password123',
                'password_confirmation' => 'new-password123',
            ],
            [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer '.$token,
            ]
        );

        $response->assertOk();
        $response->assertJsonPath('message', 'Mot de passe modifie avec succes.');
        $this->assertTrue(Hash::check('new-password123', $user->fresh()->password));
    }

    public function test_user_cannot_change_password_with_invalid_current_password(): void
    {
        $user = User::factory()->create([
            'password' => 'password123',
        ]);

        $loginResponse = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $loginResponse->assertOk();

        $token = $loginResponse->json('token');

        $response = $this->postJson(
            '/api/auth/change-password',
            [
                'current_password' => 'wrong-password',
                'password' => 'new-password123',
                'password_confirmation' => 'new-password123',
            ],
            [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer '.$token,
            ]
        );

        $response->assertStatus(422);
        $response->assertJsonPath('message', 'Le mot de passe actuel est incorrect.');
        $this->assertTrue(Hash::check('password123', $user->fresh()->password));
    }

    public function test_user_can_delete_own_account(): void
    {
        Notification::fake();

        $user = User::factory()->create([
            'password' => 'password123',
        ]);

        $category = $user->categories()->create([
            'name' => 'Expenses',
            'color_hex' => '#137fec',
            'icon' => 'payments',
        ]);

        $user->transactions()->create([
            'category_id' => $category->id,
            'description' => 'Test transaction',
            'amount' => 42.50,
            'type' => 'expense',
            'status' => 'completed',
            'occurred_at' => now(),
            'notes' => 'Created for account deletion test',
        ]);

        $loginResponse = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $loginResponse->assertOk();

        $token = $loginResponse->json('token');
        $headers = [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer '.$token,
        ];

        $requestResponse = $this->postJson('/api/auth/account/deletion-request', [], $headers);

        $requestResponse->assertOk();
        $requestResponse->assertJsonPath('message', 'Un email de confirmation de suppression a ete envoye.');

        $verificationUrl = null;

        Notification::assertSentTo(
            $user,
            AccountDeletionConfirmationNotification::class,
            static function (AccountDeletionConfirmationNotification $notification) use (&$verificationUrl): bool {
                $verificationUrl = $notification->verificationUrl;

                return true;
            }
        );

        $this->assertIsString($verificationUrl);

        $statusBeforeResponse = $this->getJson('/api/auth/account/deletion-status', $headers);
        $statusBeforeResponse->assertOk();
        $statusBeforeResponse->assertJsonPath('confirmed', false);

        $verifyResponse = $this->getJson($verificationUrl);
        $verifyResponse->assertOk();
        $verifyResponse->assertJsonPath('message', 'Suppression confirmee. Retournez a l\'application pour finaliser.');

        $statusAfterResponse = $this->getJson('/api/auth/account/deletion-status', $headers);
        $statusAfterResponse->assertOk();
        $statusAfterResponse->assertJsonPath('confirmed', true);

        $deleteResponse = $this->deleteJson('/api/auth/account', [], $headers);

        $deleteResponse->assertOk();
        $deleteResponse->assertJsonPath('message', 'Compte supprime avec succes.');

        $this->assertNull(User::find($user->id));
        $this->assertDatabaseMissing((new Category)->getTable(), ['id' => $category->id]);
        $this->assertDatabaseMissing((new Transaction)->getTable(), [
            'user_id' => $user->id,
            'description' => 'Test transaction',
        ]);

        $meResponse = $this->getJson('/api/auth/me', $headers);
        $meResponse->assertStatus(401);
    }

    public function test_user_cannot_delete_account_without_email_confirmation(): void
    {
        $user = User::factory()->create([
            'password' => 'password123',
        ]);

        $loginResponse = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $loginResponse->assertOk();

        $token = $loginResponse->json('token');
        $headers = [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer '.$token,
        ];

        $deleteResponse = $this->deleteJson('/api/auth/account', [], $headers);
        $deleteResponse->assertStatus(403);
        $deleteResponse->assertJsonPath('message', 'Confirmation de suppression requise via email.');
        $this->assertNotNull(User::find($user->id));
    }
}
