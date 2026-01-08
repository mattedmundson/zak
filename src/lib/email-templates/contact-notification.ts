const LOGO_URL = 'https://xqtdcodyrimenmnairgk.supabase.co/storage/v1/object/public/general-images/1767900744839-sv94qy6omf.png'

interface ContactNotificationProps {
  firstName: string
  lastName: string
  email: string
  message: string
  subscribedToNewsletter: boolean
}

export function getContactNotificationEmail({
  firstName,
  lastName,
  email,
  message,
  subscribedToNewsletter,
}: ContactNotificationProps): string {
  const fullName = `${firstName} ${lastName}`

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
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
                New Contact Form Submission
              </h1>

              <!-- Contact Details -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-size: 14px; font-weight: 600; color: #6b7280;">From</span>
                  </td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    <span style="font-size: 14px; color: #111827;">${fullName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-size: 14px; font-weight: 600; color: #6b7280;">Email</span>
                  </td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    <a href="mailto:${email}" style="font-size: 14px; color: #000000; text-decoration: underline;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="font-size: 14px; font-weight: 600; color: #6b7280;">Newsletter</span>
                  </td>
                  <td style="padding: 8px 0; text-align: right;">
                    <span style="font-size: 14px; color: #111827;">${subscribedToNewsletter ? 'Yes, subscribed' : 'No'}</span>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #111827;">
                Message:
              </p>
              <div style="background-color: #f9fafb; border-left: 3px solid #000000; padding: 16px 20px; margin: 0;">
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #4b5563;">
                  ${message.replace(/\n/g, '<br>')}
                </p>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; text-align: center;">
              <p style="margin: 0; font-size: 13px; color: #9ca3af;">
                Sent from mattedmundson.com contact form
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
