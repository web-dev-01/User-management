import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: 'Champion Semiconductor <noreply@yourdomain.com>', // Use resend verified domain or test@resend.dev
      to,
      subject,
      html
    });

    return { success: true, data };
  } catch (err) {
    console.error("Email Error:", err);
    return { success: false, error: err };
  }
};
