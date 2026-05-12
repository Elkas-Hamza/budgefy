<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Social Login</title>
  </head>
  <body>
    <script>
      (function(){
        try {
          const token = '{{ $token }}';
          const origin = '{{ $origin }}' || window.location.origin;
          if (window.opener && typeof window.opener.postMessage === 'function') {
            window.opener.postMessage({ type: 'socialLogin', token }, origin);
          }
        } catch (e) {
          // ignore
        }
        window.close();
      })();
    </script>
    <p>Closing…</p>
  </body>
  </html>
