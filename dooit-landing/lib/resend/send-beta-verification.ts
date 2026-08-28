import "server-only";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    subject: "Confirm your Doo It! beta email",
    heading: "One last step.",
    body: "Confirm this email address to join the Doo It! closed beta waitlist.",
    button: "Confirm my email",
    expiry: "This secure link expires in 30 minutes and can only be used once.",
    ignore: "If you did not request this, you can safely ignore this message.",
  },
  es: {
    subject: "Confirma tu correo para la beta de Doo It!",
    heading: "Solo falta un paso.",
    body: "Confirma este correo para unirte a la lista de espera de la beta cerrada de Doo It!.",
    button: "Confirmar mi correo",
    expiry: "Este enlace seguro vence en 30 minutos y solo puede utilizarse una vez.",
    ignore: "Si no solicitaste esto, puedes ignorar el mensaje con tranquilidad.",
  },
} satisfies Record<Locale, Record<string, string>>;

type VerificationEmail = {
  email: string;
  token: string;
  locale: Locale;
};

export async function sendBetaVerificationEmail({
  email,
  token,
  locale,
}: VerificationEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const siteUrl = process.env.SITE_URL;

  if (!apiKey || !from || !siteUrl) {
    throw new Error("Resend server environment variables are not configured");
  }

  const verificationUrl = new URL("/api/beta/verify", siteUrl);
  verificationUrl.searchParams.set("token", token);
  verificationUrl.searchParams.set("lang", locale);

  const message = copy[locale];
  const link = verificationUrl.toString();
  const logoUrl = new URL("/logo.png", siteUrl).toString();
  const html = `
    <!doctype html>
    <html lang="${locale}">
      <body style="margin:0;background:#f4f5f8;font-family:Arial,sans-serif;color:#171717">
        <div style="max-width:560px;margin:0 auto;padding:48px 20px">
          <div style="background:#fff;border:1px solid #e8e8e8;border-radius:24px;padding:36px">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px">
              <tr>
                <td style="padding-right:10px;vertical-align:middle">
                  <img src="${logoUrl}" width="36" height="36" alt="" style="display:block;width:36px;height:36px;border:0;object-fit:contain" />
                </td>
                <td style="vertical-align:middle;font-size:18px;font-weight:800">Doo It!</td>
              </tr>
            </table>
            <h1 style="margin:0 0 16px;font-size:32px;line-height:1.05">${message.heading}</h1>
            <p style="margin:0 0 28px;color:#626262;line-height:1.6">${message.body}</p>
            <a href="${link}" style="display:inline-block;border-radius:999px;background:#171717;color:#fff;padding:15px 24px;font-size:14px;font-weight:700;text-decoration:none">${message.button}</a>
            <p style="margin:28px 0 0;color:#7b7b7b;font-size:12px;line-height:1.6">${message.expiry}</p>
            <p style="margin:8px 0 0;color:#7b7b7b;font-size:12px;line-height:1.6">${message.ignore}</p>
          </div>
        </div>
      </body>
    </html>`;

  const text = `${message.heading}\n\n${message.body}\n\n${message.button}: ${link}\n\n${message.expiry}\n${message.ignore}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: message.subject,
      html,
      text,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });

  return response.ok;
}
