<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; }
        .header { background-color: #3b82f6; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background-color: white; padding: 30px; border-radius: 0 0 8px 8px; }
        .code { font-size: 32px; font-weight: bold; color: #3b82f6; text-align: center; letter-spacing: 5px; margin: 20px 0; font-family: 'Courier New', monospace; }
        .footer { text-align: center; color: #888; font-size: 12px; margin-top: 20px; }
        .warning { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin: 20px 0; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Authentification à deux facteurs</h2>
        </div>
        <div class="content">
            <p>Bonjour,</p>
            <p>Vous avez demandé un code d'authentification pour accéder à votre compte Budgefy.</p>
            <p>Veuillez entrer le code suivant :</p>
            <div class="code">{{ $code }}</div>
            <p>Ce code expire dans 10 minutes.</p>
            <div class="warning">
                <strong>Attention :</strong> Ne partagez jamais ce code avec quiconque. L'équipe Budgefy ne vous demandera jamais ce code par email.
            </div>
            <p>Si vous n'avez pas demandé ce code, ignorez cet email.</p>
            <div class="footer">
                <p>&copy; 2026 Budgefy - Gestion Budgétaire Personnelle</p>
            </div>
        </div>
    </div>
</body>
</html>
