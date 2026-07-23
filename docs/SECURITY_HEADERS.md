# Security Headers — CodiFlux

## Overview

This is a **static site** hosted on Hostinger. Security headers are configured
at the server level via `.htaccess` (Apache) in cPanel, not in Astro.

After each deployment, add or update these headers in:
`cPanel → File Manager → public_html → .htaccess`

---

## Recommended `.htaccess` Security Configuration

```apache
# ── Security Headers ────────────────────────────────────────────

<IfModule mod_headers.c>

  # Content-Security-Policy
  # Restricts where resources can be loaded from.
  # Adjust as you add third-party scripts (analytics, forms, etc.)
  Header set Content-Security-Policy "\
    default-src 'self'; \
    script-src 'self' 'unsafe-inline'; \
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; \
    font-src 'self' https://fonts.gstatic.com; \
    img-src 'self' data: https:; \
    connect-src 'self'; \
    frame-ancestors 'none'; \
    base-uri 'self'; \
    form-action 'self' https://formspree.io; \
  "

  # Prevents browsers from MIME-sniffing the content type
  Header set X-Content-Type-Options "nosniff"

  # Prevents clickjacking — site cannot be embedded in iframes
  Header set X-Frame-Options "DENY"

  # Referrer policy — controls what's sent in the Referer header
  Header set Referrer-Policy "strict-origin-when-cross-origin"

  # Permissions Policy — disables browser features you don't use
  Header set Permissions-Policy "\
    camera=(), \
    microphone=(), \
    geolocation=(), \
    payment=(), \
    usb=() \
  "

  # HSTS — forces HTTPS for 1 year (enable ONLY after SSL is confirmed working)
  # WARNING: Do not enable until HTTPS is verified working. Very hard to undo.
  # Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"

</IfModule>

# ── Disable Directory Listing ─────────────────────────────────
Options -Indexes

# ── Hide Server Information ───────────────────────────────────
ServerSignature Off

# ── Block Access to Sensitive Files ──────────────────────────
<FilesMatch "(\.env|\.gitignore|\.gitattributes|package\.json|package-lock\.json)$">
  Order allow,deny
  Deny from all
</FilesMatch>
```

---

## Security Score Testing

After deploying, test your headers at:
- **https://securityheaders.com** — Target grade: **A** or **A+**
- **https://observatory.mozilla.org** — Target grade: **B+** or higher

---

## Notes for Future Features

### If adding analytics (Plausible/GA4):
Update the `Content-Security-Policy` to allow the analytics domain:
```apache
script-src 'self' https://plausible.io;
connect-src 'self' https://plausible.io;
```

### If adding Formspree contact form:
The `form-action` directive is already set to allow `https://formspree.io`.

### HSTS Warning
Do **not** enable HSTS (`Strict-Transport-Security`) until:
1. SSL certificate is fully active on Hostinger
2. All HTTP → HTTPS redirects are confirmed working
3. You are certain you won't revert to HTTP

HSTS is very difficult to undo once browsers have cached it.

---

## HTTPS Redirect (Hostinger cPanel)

Hostinger provides a one-click SSL via Let's Encrypt in cPanel.
After enabling SSL, add this redirect to `.htaccess`:

```apache
# Redirect HTTP to HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```
