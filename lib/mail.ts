import nodemailer from "nodemailer";

export const mailConfigured = () => Boolean(process.env.EMAIL_SERVER && process.env.EMAIL_FROM);

// Sends mail through the same SMTP server NextAuth uses for sign-in links
// (EMAIL_SERVER / EMAIL_FROM). Returns false when mail isn't configured.
export async function sendMail(message: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}): Promise<boolean> {
  const server = process.env.EMAIL_SERVER;
  const from = process.env.EMAIL_FROM;
  if (!server || !from) return false;
  await nodemailer.createTransport(server).sendMail({ from, ...message });
  return true;
}
