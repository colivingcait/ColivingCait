export default function VerifyRequestPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-4">
          ✦ Check your email
        </p>
        <h1 className="font-heading text-4xl md:text-5xl leading-heading text-charcoal mb-3">
          Magic link sent.
        </h1>
        <p className="text-warmgray leading-body">
          We sent you a sign-in link. Click it to access your courses. If you
          don&apos;t see it, check your spam folder.
        </p>
      </div>
    </div>
  );
}
