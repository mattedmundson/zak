const LOGO_URL = 'https://xqtdcodyrimenmnairgk.supabase.co/storage/v1/object/public/general-images/1767900744839-sv94qy6omf.png'
const SIGNATURE_URL = 'https://xqtdcodyrimenmnairgk.supabase.co/storage/v1/object/public/general-images/1767023756101-ty3ucftisj.png'

interface ContactConfirmationProps {
  firstName: string
  message: string
}

export function getContactConfirmationEmail({ firstName, message }: ContactConfirmationProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thanks for getting in touch</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">
          <!-- Black Header -->
          <tr>
            <td style="background-color: #000000; padding: 24px 32px; border-radius: 8px 8px 0 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="vertical-align: middle;">
                    <a href="https://mattedmundson.com" style="text-decoration: none;">
                      <img src="${LOGO_URL}" alt="Matt Edmundson" height="40" style="display: block; height: 40px; width: auto;" />
                    </a>
                  </td>
                  <td style="vertical-align: middle; text-align: right;">
                    <a href="https://auriondigital.com" style="color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 500; margin-left: 24px;">Aurion</a>
                    <a href="https://ecommerce-podcast.com" style="color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 500; margin-left: 24px;">eCommerce Podcast</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- White Content Area -->
          <tr>
            <td style="background-color: #ffffff; padding: 40px 32px; border-radius: 0 0 8px 8px;">
              <h1 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 600; color: #111827;">
                Thanks for reaching out, ${firstName}!
              </h1>
              <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #374151;">
                I've received your message and will get back to you as soon as possible.
              </p>
              <p style="margin: 24px 0 12px 0; font-size: 14px; font-weight: 600; color: #111827;">
                Here's a copy of your message:
              </p>
              <div style="background-color: #f9fafb; border-left: 3px solid #000000; padding: 16px 20px; margin: 0 0 24px 0;">
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #4b5563;">
                  ${message.replace(/\n/g, '<br>')}
                </p>
              </div>
              <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #374151;">
                Best regards,
              </p>
              <img src="${SIGNATURE_URL}" alt="Matt Edmundson signature" height="50" style="display: block; height: 50px; width: auto; margin-bottom: 8px;" />
              <p style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">
                Matt Edmundson
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; text-align: center;">
              <p style="margin: 0; font-size: 13px; color: #9ca3af;">
                Matt Edmundson
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}
