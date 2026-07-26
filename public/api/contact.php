<?php
/**
 * contact.php — CodiFlux Contact Form Handler
 *
 * Receives JSON POST from the ContactCTA form, validates and sanitizes all
 * input server-side, sends an email via PHP mail(), and returns a JSON response.
 *
 * ─── CONFIGURATION ───────────────────────────────────────────────────────────
 *
 * RECIPIENT EMAIL
 *   Change the recipient address in one place below — do NOT update it anywhere
 *   else in the codebase. Search for RECIPIENT_EMAIL to find it instantly.
 *
 * FROM EMAIL (SENDER ADDRESS)
 *   The address that appears in the From: header. Must be on a domain hosted
 *   by the same server for PHP mail() to send reliably on Hostinger.
 *   Search for FROM_EMAIL to change it. See constant documentation below.
 *
 * FUTURE SMTP / EMAIL PROVIDER
 *   PHP mail() works on Hostinger shared hosting out of the box.
 *   To switch to an SMTP provider (Resend, Mailgun, Brevo, etc.):
 *     1. Install PHPMailer via Composer (composer require phpmailer/phpmailer)
 *     2. Replace the mail() call in the send_email() function below with the
 *        relevant PHPMailer/SDK integration.
 *     3. Store SMTP credentials in Hostinger's environment variables or a
 *        .env file excluded from Git.
 *
 * ─── SECURITY NOTES ──────────────────────────────────────────────────────────
 *   - All input is sanitized before use.
 *   - Honeypot field rejects bot submissions silently (200 OK).
 *   - Rate limiting can be added by checking $_SESSION or an IP file if needed.
 *   - PHP errors are suppressed from API output — only JSON is returned.
 *   - CORS restricted to same-origin only.
 *
 * ─── HOSTINGER NOTES ─────────────────────────────────────────────────────────
 *   - PHP 8.x is available on Hostinger shared plans.
 *   - PHP mail() uses the shared MTA — emails may land in spam initially.
 *     Add an SPF record for codiflux.dev in Hostinger's DNS panel.
 *   - This file lives in public/api/ and is served directly by the web server.
 */

// ─── Configuration ────────────────────────────────────────────────────────────

/**
 * RECIPIENT_EMAIL
 * All project enquiries will be delivered to this address.
 * This is the ONLY place you need to update the recipient address.
 */
define('RECIPIENT_EMAIL', 'kumarjogesh2000@gmail.com');

/**
 * FROM_NAME
 * The sender display name shown in the email client.
 */
define('FROM_NAME', 'CodiFlux Website');

/**
 * FROM_EMAIL
 * The address that appears in the From: header of outgoing emails.
 *
 * PHP mail() on Hostinger shared hosting works most reliably when the
 * sender address belongs to a domain hosted on the same account.
 *
 * Current state — no domain mailbox configured yet:
 *   Using noreply@codiflux.dev. Hostinger's MTA will still send it, but
 *   the address doesn't need to be a real inbox since Reply-To points
 *   to the visitor's address.
 *
 * Once hello@codiflux.dev is created in Hostinger hPanel (Email → Create):
 *   Change this value to 'hello@codiflux.dev'.
 *   That single change is all that is needed — nowhere else in the code
 *   references the sender address.
 *
 * Search for FROM_EMAIL to find this constant instantly.
 */
define('FROM_EMAIL', 'noreply@codiflux.dev');

/**
 * SITE_URL
 * Used for CORS validation. Must match the production domain.
 */
define('SITE_URL', 'https://codiflux.dev');

/**
 * MESSAGE_MAX_LENGTH
 * Maximum allowed characters in the message field to prevent abuse.
 */
define('MESSAGE_MAX_LENGTH', 5000);

// ─── Bootstrap ───────────────────────────────────────────────────────────────

// Suppress PHP errors from leaking into JSON output
error_reporting(0);
ini_set('display_errors', '0');

// Output buffering: ensures no stray whitespace before headers
ob_start();

// ─── Headers ─────────────────────────────────────────────────────────────────

// Only allow same-origin requests in production.
// During local Astro dev (localhost:4321) this header won't block — adjust if needed.
$allowed_origins = [SITE_URL, 'http://localhost:4321', 'http://localhost:3000'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(200);
    ob_end_clean();
    exit;
}

// ─── Only accept POST ─────────────────────────────────────────────────────────

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_error(405, 'Method not allowed.');
}

// ─── Parse Request Body ───────────────────────────────────────────────────────

$raw = file_get_contents('php://input');

if (empty($raw)) {
    send_error(400, 'Empty request body.');
}

$data = json_decode($raw, true);

if (!is_array($data)) {
    send_error(400, 'Invalid JSON payload.');
}

// ─── Honeypot Check ───────────────────────────────────────────────────────────
// If the hidden honeypot field is filled, this is a bot.
// Return 200 OK silently — bots should not know they were rejected.

if (!empty($data['_honeypot'])) {
    send_success('Your project enquiry has been sent successfully.');
}

// ─── Sanitize Input ───────────────────────────────────────────────────────────

$name         = sanitize_text($data['name']         ?? '');
$email        = sanitize_email_addr($data['email']  ?? '');
$project_type = sanitize_text($data['project_type'] ?? '');
$message      = sanitize_text($data['message']      ?? '');

// ─── Server-Side Validation ───────────────────────────────────────────────────

$errors = [];

// Name: required, min 2 chars
if ($name === '') {
    $errors['name'] = 'Name is required.';
} elseif (mb_strlen($name) < 2) {
    $errors['name'] = 'Name must be at least 2 characters.';
} elseif (mb_strlen($name) > 100) {
    $errors['name'] = 'Name is too long.';
}

// Email: required, valid format
if ($email === '') {
    $errors['email'] = 'Email address is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email address.';
} elseif (mb_strlen($email) > 254) {
    $errors['email'] = 'Email address is too long.';
}

// Project type: required, must be a known value
$allowed_project_types = [
    'business-website',
    'ecommerce',
    'landing-page',
    'wordpress',
    'shopify',
    'wix-studio',
    'squarespace',
    'custom-development',
    'performance-optimization',
    'other',
];

if ($project_type === '') {
    $errors['project_type'] = 'Please select a project type.';
} elseif (!in_array($project_type, $allowed_project_types, true)) {
    $errors['project_type'] = 'Invalid project type selected.';
}

// Message: required, min 20 chars, max MESSAGE_MAX_LENGTH
if ($message === '') {
    $errors['message'] = 'Message is required.';
} elseif (mb_strlen($message) < 20) {
    $errors['message'] = 'Message must be at least 20 characters.';
} elseif (mb_strlen($message) > MESSAGE_MAX_LENGTH) {
    $errors['message'] = 'Message is too long (maximum ' . MESSAGE_MAX_LENGTH . ' characters).';
}

if (!empty($errors)) {
    http_response_code(422);
    ob_end_clean();
    echo json_encode([
        'success' => false,
        'message' => 'Please fix the validation errors below.',
        'errors'  => $errors,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// ─── Format Project Type Label ────────────────────────────────────────────────

$project_type_labels = [
    'business-website'         => 'Business Website',
    'ecommerce'                => 'E-Commerce',
    'landing-page'             => 'Landing Page',
    'wordpress'                => 'WordPress',
    'shopify'                  => 'Shopify',
    'wix-studio'               => 'Wix Studio',
    'squarespace'              => 'Squarespace',
    'custom-development'       => 'Custom Development',
    'performance-optimization' => 'Performance Optimization',
    'other'                    => 'Other',
];

$project_type_label = $project_type_labels[$project_type] ?? ucfirst(str_replace('-', ' ', $project_type));

// ─── Collect Metadata ─────────────────────────────────────────────────────────

$submitted_at = gmdate('Y-m-d H:i:s') . ' UTC';
$visitor_ip   = get_client_ip();
$user_agent   = isset($_SERVER['HTTP_USER_AGENT'])
    ? mb_substr(strip_tags($_SERVER['HTTP_USER_AGENT']), 0, 300)
    : 'Unknown';

// ─── Build Email ─────────────────────────────────────────────────────────────

$subject = 'New Project Enquiry — CodiFlux Website';

$body = build_email_body(
    $name,
    $email,
    $project_type_label,
    $message,
    $submitted_at,
    $visitor_ip,
    $user_agent
);

// ─── Send Email ───────────────────────────────────────────────────────────────

$sent = send_email(RECIPIENT_EMAIL, $subject, $body, $name, $email);

if ($sent) {
    send_success('Your project enquiry has been sent successfully.');
} else {
    // TODO: Once hello@codiflux.dev is active, update this message to use the professional address.
    send_error(500, "We couldn't send your enquiry at the moment. Please contact us directly at kumarjogesh2000@gmail.com.");
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

/**
 * sanitize_text()
 * Strips tags, removes null bytes, trims whitespace.
 */
function sanitize_text(string $value): string
{
    $value = str_replace("\0", '', $value);       // Remove null bytes
    $value = strip_tags($value);                  // Strip HTML/PHP tags
    $value = htmlspecialchars_decode($value, ENT_QUOTES);
    return trim($value);
}

/**
 * sanitize_email_addr()
 * Strips tags and filters to valid email characters only.
 */
function sanitize_email_addr(string $value): string
{
    $value = sanitize_text($value);
    return filter_var($value, FILTER_SANITIZE_EMAIL) ?: '';
}

/**
 * get_client_ip()
 * Returns the best-available client IP, accounting for common proxies.
 */
function get_client_ip(): string
{
    $headers = [
        'HTTP_CF_CONNECTING_IP',   // Cloudflare
        'HTTP_X_FORWARDED_FOR',
        'HTTP_X_REAL_IP',
        'REMOTE_ADDR',
    ];

    foreach ($headers as $header) {
        if (!empty($_SERVER[$header])) {
            // X-Forwarded-For can be a comma-separated list — take the first
            $ip = trim(explode(',', $_SERVER[$header])[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }

    return 'Unknown';
}

/**
 * build_email_body()
 * Returns a clean, professional plain-text email body.
 *
 * FUTURE SMTP / HTML EMAIL
 *   Replace this function's return value with an HTML template string when
 *   switching to PHPMailer or a transactional email provider.
 */
function build_email_body(
    string $name,
    string $email,
    string $project_type,
    string $message,
    string $submitted_at,
    string $visitor_ip,
    string $user_agent
): string {
    $divider = str_repeat('─', 60);

    return <<<EMAIL
CodiFlux — New Project Enquiry
{$divider}

CONTACT DETAILS
  Name          : {$name}
  Email         : {$email}
  Project Type  : {$project_type}

MESSAGE
{$divider}
{$message}
{$divider}

SUBMISSION DETAILS
  Submitted At  : {$submitted_at}
  Visitor IP    : {$visitor_ip}
  User Agent    : {$user_agent}

{$divider}
This message was sent from the CodiFlux website contact form.
To reply, use the email address above.
EMAIL;
}

/**
 * send_email()
 * Sends a plain-text email using PHP mail().
 *
 * FUTURE SMTP INTEGRATION POINT
 *   Replace the mail() call here with PHPMailer, Resend SDK, Mailgun, etc.
 *   The function signature and return value (bool) stay the same.
 *
 * @param string $to          Recipient email
 * @param string $subject     Email subject
 * @param string $body        Plain-text email body
 * @param string $sender_name Submitter's display name (for Reply-To)
 * @param string $sender_email Submitter's email (for Reply-To)
 */
function send_email(
    string $to,
    string $subject,
    string $body,
    string $sender_name,
    string $sender_email
): bool {
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-Type: text/plain; charset=UTF-8' . "\r\n";
    $headers .= 'Content-Transfer-Encoding: 8bit' . "\r\n";
    // Reply-To: lets you hit Reply in your email client to reach the enquirer
    $headers .= 'Reply-To: ' . encode_name($sender_name) . ' <' . $sender_email . '>' . "\r\n";
    $headers .= 'From: ' . encode_name(FROM_NAME) . ' <' . FROM_EMAIL . '>' . "\r\n";
    $headers .= 'X-Mailer: CodiFlux/1.0';

    $encoded_subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

    return @mail($to, $encoded_subject, $body, $headers);
}

/**
 * encode_name()
 * RFC 2047 encodes a display name for use in email headers.
 */
function encode_name(string $name): string
{
    return '=?UTF-8?B?' . base64_encode($name) . '?=';
}

/**
 * send_success()
 * Emit a 200 JSON success response and exit.
 */
function send_success(string $message): never
{
    http_response_code(200);
    ob_end_clean();
    echo json_encode([
        'success' => true,
        'message' => $message,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * send_error()
 * Emit an error JSON response and exit.
 * PHP error details are never exposed — only the safe $message string.
 */
function send_error(int $code, string $message): never
{
    http_response_code($code);
    ob_end_clean();
    echo json_encode([
        'success' => false,
        'message' => $message,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
