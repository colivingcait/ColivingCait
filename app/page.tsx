import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Card from "@/components/Card";

// Placeholder homepage — exists only to preview the base components against
// the brand color system. Real homepage content will be built next.
export default function Home() {
  return (
    <>
      {/* Hero — cream background to verify charcoal headings + gold italic */}
      <Section tone="cream">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow className="mb-6">Foundation preview</Eyebrow>
            <Heading level={1} size="xl">
              Building wealth through <em>intentional coliving.</em>
            </Heading>
            <p className="mt-6 max-w-lg text-warmgray leading-body">
              This page is a temporary preview of the brand foundation —
              colors, typography, and the seven base components. Real page
              content lands in the next step.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Book a Discovery Call
              </Button>
              <Button href="/what-is-coliving" variant="outline" size="lg">
                Learn About Coliving
              </Button>
            </div>
          </div>

          {/* Photo placeholder block */}
          <div className="aspect-[4/5] w-full bg-blush border border-brand flex items-center justify-center text-warmgray">
            <span className="font-heading italic text-2xl">photo placeholder</span>
          </div>
        </div>
      </Section>

      {/* Stats bar — charcoal full-bleed strip */}
      <Section tone="charcoal" compact>
        <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
          <div>
            <p className="font-heading text-4xl text-gold">$2.5M</p>
            <p className="mt-1 text-xs uppercase tracking-button text-cream/70">
              Assets Under Management
            </p>
          </div>
          <div>
            <p className="font-heading text-4xl text-gold">50+</p>
            <p className="mt-1 text-xs uppercase tracking-button text-cream/70">
              Coliving Rooms
            </p>
          </div>
          <div>
            <p className="font-heading text-4xl text-gold">100+</p>
            <p className="mt-1 text-xs uppercase tracking-button text-cream/70">
              Residents Housed
            </p>
          </div>
        </div>
      </Section>

      {/* Three service cards — cream background to test Card component */}
      <Section tone="cream">
        <div className="text-center">
          <Eyebrow className="mb-4">Component preview</Eyebrow>
          <Heading size="md">
            How I can <em>help.</em>
          </Heading>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card>
            <p className="text-2xl text-gold mb-4">◈</p>
            <Heading level={3} size="sm">Buy &amp; Sell</Heading>
            <p className="mt-3 text-warmgray text-sm leading-body">
              A realtor who thinks like an investor — investment properties,
              coliving conversions, and house hacking.
            </p>
          </Card>
          <Card>
            <p className="text-2xl text-gold mb-4">♀</p>
            <Heading level={3} size="sm">Get Coaching</Heading>
            <p className="mt-3 text-warmgray text-sm leading-body">
              Your roadmap to coliving — tailored to where you are and where
              you want to go.
            </p>
          </Card>
          <Card>
            <p className="text-2xl text-gold mb-4">$</p>
            <Heading level={3} size="sm">Partner With Me</Heading>
            <p className="mt-3 text-warmgray text-sm leading-body">
              Your money working while you live your life. Passive coliving
              partnerships in the Atlanta metro.
            </p>
          </Card>
        </div>
      </Section>

      {/* Gold quote banner — full-bleed, italic display headline */}
      <Section tone="gold" fullBleed>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-heading text-2xl md:text-4xl italic leading-heading">
            &ldquo;Coliving isn&apos;t just a housing strategy — it&apos;s how
            women are building generational wealth right now.&rdquo;
          </p>
        </div>
      </Section>

      {/* Blush section to verify the third light tone */}
      <Section tone="blush">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Eyebrow className="mb-4">Sparkle bullets</Eyebrow>
            <Heading size="md">
              Brand patterns <em>at a glance.</em>
            </Heading>
            <ul className="mt-6 space-y-3 text-warmgray">
              <li><span className="text-gold mr-2">✦</span>Cormorant Garamond display headings with gold italic emphasis</li>
              <li><span className="text-gold mr-2">✦</span>DM Sans body at weight 300 with 1.8 line-height</li>
              <li><span className="text-gold mr-2">✦</span>Square-cornered buttons, uppercase, 0.09em tracking</li>
              <li><span className="text-gold mr-2">✦</span>Thin gold borders at 25% opacity on every card</li>
            </ul>
          </div>
          <Button href="/contact" variant="secondary" size="md">
            Get In Touch
          </Button>
        </div>
      </Section>
    </>
  );
}
