import nodemailer from "nodemailer";

export const mailConfigured = () => Boolean(process.env.EMAIL_SERVER && process.env.EMAIL_FROM);

// The address part of EMAIL_FROM ("Coliving Cait <x@y.com>" -> "x@y.com").
function fromAddress(from: string) {
  const m = from.match(/<([^>]+)>/);
  return (m ? m[1] : from).trim();
}

// Sends mail through the same SMTP server NextAuth uses for sign-in links
// (EMAIL_SERVER / EMAIL_FROM). Returns false when mail isn't configured.
// `fromName` swaps the display name but keeps EMAIL_FROM's address, since
// SMTP providers like Gmail only send as the account's own address.
export async function sendMail(message: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  fromName?: string;
}): Promise<boolean> {
  const server = process.env.EMAIL_SERVER;
  const envFrom = process.env.EMAIL_FROM;
  if (!server || !envFrom) return false;
  const { fromName, ...rest } = message;
  const from = fromName ? { name: fromName, address: fromAddress(envFrom) } : envFrom;
  await nodemailer.createTransport(server).sendMail({ from, ...rest });
  return true;
}
