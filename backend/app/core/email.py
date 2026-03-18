import smtplib
import ssl
from email.message import EmailMessage

from app.core.config import get_settings

settings = get_settings()


def send_email(to_email: str, subject: str, body: str) -> None:
    """Send a plain-text email using SMTP settings. Fails quietly on errors."""

    if not to_email:
        return

    msg = EmailMessage()
    msg["From"] = settings.SMTP_FROM
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.set_content(body)

    # Always echo to console for visibility in dev environments
    print(f"[email:debug] To: {to_email}\nSubject: {subject}\n\n{body}\n{'-'*40}")

    try:
        if settings.SMTP_USER and settings.SMTP_PASSWORD:
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(
                settings.SMTP_HOST, settings.SMTP_PORT, context=context
            ) as server:
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.send_message(msg)
        else:
            # No auth / local dev server (e.g., MailHog)
            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
                server.send_message(msg)
    except Exception as exc:  # pragma: no cover - best-effort notification
        print(f"[email] Failed to send email to {to_email}: {exc}")
