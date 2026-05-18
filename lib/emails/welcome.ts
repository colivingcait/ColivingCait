import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type WelcomeEmailProps = {
  to: string;
  firstName?: string;
  courseName: string;
  isBundle: boolean;
  siteUrl: string;
};

export async function sendWelcomeEmail({
  to,
  firstName,
  courseName,
  isBundle,
  siteUrl,
}: WelcomeEmailProps) {
  const name = firstName || "there";
  const signInUrl = `${siteUrl}/auth/signin`;
  const dashboardUrl = `${siteUrl}/dashboard`;

  const subject = isBundle
    ? "You're in! Your Explorer Bundle is ready"
    : `You're in! ${courseName} is ready`;

  const body = `Hey ${name},

Welcome — I'm so glad you're here.

${
  isBundle
    ? `Your Explorer Bundle is ready to go. That's Real Estate Investing 101, House Hacking 101, and Coliving 101 — plus a free 30-minute strategy call with me.

To book your strategy call, use this link: https://calendly.com/colivingcait/explorer-courses-30-min-strategy-call`
    : `Your course — ${courseName} — is ready to go.`
}

Here's how to get started:

1. Go to ${signInUrl}
2. Enter the email you used to purchase (${to})
3. Click the magic link in your inbox
4. You'll land on your dashboard where you can start your course

That's it — no password to remember, just a magic link every time you sign in.

Once you're in, your dashboard (${dashboardUrl}) is your home base. You'll see your courses, your progress, and everything else available to you.

Take your time with the material. Go at your own pace. And if you have any questions along the way, just reply to this email — I read every one.

I'm rooting for you.

Cait

P.S. If you run into any issues signing in, just reply to this email and I'll get you sorted.`;

  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Coliving Cait <hello@colivingcait.com>",
      to,
      subject,
      text: body,
    });
    console.log(`[welcome-email] Sent to ${to}:`, result);
    return result;
  } catch (err) {
    console.error(`[welcome-email] Failed for ${to}:`, err);
    return null;
  }
}
