import Image from "next/image";
import type { ReactNode } from "react";
import { HOUSE_HACKING_URL } from "@/lib/site";

const ATLANTA_WOMEN_INVESTORS_URL = "https://www.atlantawomeninvestors.com";
const BOOK_URL = "/book";

export const metadata = {
  title: "Grow With Me at KW",
  description:
    "Build a real estate business you love, with people in your corner. Join Caitlyn Verdugo at Keller Williams Realty Metro Atlanta.",
  alternates: { canonical: "/grow-with-me" },
  openGraph: {
    title: "Grow With Me at KW",
    description:
      "Build a real estate business you love, with people in your corner. Join Caitlyn Verdugo at Keller Williams Realty Metro Atlanta.",
    url: "/grow-with-me",
    images: [
      {
        url: "/images/cait.jpg",
        width: 1080,
        height: 1080,
        alt: "Caitlyn Verdugo",
      },
    ],
  },
};

const why = [
  {
    n: "01",
    title: "Real training",
    copy: "Classes, coaching and tools to sharpen your skills at every stage of your career.",
  },
  {
    n: "02",
    title: "A sharing culture",
    copy: "Agents here help each other win, and profit share rewards everyone who helps the office grow.",
  },
  {
    n: "03",
    title: "Freedom to build",
    copy: "Room to build your own niche, your own brand and your own schedule, your way.",
  },
];

const steps = [
  {
    n: "1",
    title: "You join",
    copy: "You become part of the Metro Atlanta office.",
  },
  {
    n: "2",
    title: "You help it grow",
    copy: "Agents you introduce decide to join, too.",
  },
  {
    n: "3",
    title: "KW shares profit",
    copy: "A portion of company profit goes back to agents who helped grow it.",
  },
  {
    n: "4",
    title: "It can keep going",
    copy: "It can continue as passive income, even years down the road.",
  },
];

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: ReactNode;
}) {
  return (
    <div className="mb-10 text-center min-[801px]:mb-16">
      <span className="eyebrow eyebrow-center mb-0">{eyebrow}</span>
      <h2 className="mt-[18px] font-heading text-[36px] font-light leading-[1.08] tracking-[-0.02em] text-charcoal min-[801px]:text-[48px]">
        {title}
      </h2>
    </div>
  );
}

export default function GrowWithMePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-[1200px] items-center gap-11 px-6 pb-[72px] pt-[117px] min-[801px]:grid-cols-[1.1fr_0.9fr] min-[801px]:gap-20 min-[801px]:px-[60px] min-[801px]:pb-[110px] min-[801px]:pt-[169px]">
        <div>
          <span className="eyebrow mb-0">Join my team</span>
          <h1 className="my-4 font-heading text-[50px] font-light leading-[1.08] tracking-[-0.02em] text-charcoal min-[801px]:my-[22px] min-[801px]:text-[76px]">
            Grow with me <em className="font-light italic text-gold">at KW</em>
          </h1>
          <p className="mb-7 max-w-[440px] text-[17px] leading-[1.8] text-warmgray min-[801px]:mb-[38px] min-[801px]:text-[19px]">
            Build a real estate business you love, with people in your corner.
          </p>
          <a className="btn-gold" href={BOOK_URL}>
            Book a 20-minute call
          </a>
        </div>
        <div className="relative mr-[22px] w-full max-w-[300px] min-[801px]:mr-0 min-[801px]:max-w-none">
          <Image
            src="/images/cait.jpg"
            alt="Caitlyn Verdugo"
            width={1080}
            height={1080}
            priority
            className="relative z-[1] aspect-square w-full object-cover object-[50%_20%] min-[801px]:aspect-[4/5]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute z-0 border border-gold"
            style={{ inset: "22px -22px -22px 22px" }}
          />
        </div>
      </section>

      <section className="bg-cream px-6 py-[72px] min-[801px]:px-[60px] min-[801px]:py-[110px]">
        <div className="mx-auto max-w-[1080px]">
          <SectionHeading
            eyebrow="Why I chose"
            title={
              <>
                Keller Williams Realty{" "}
                <em className="font-light italic text-gold">Metro Atlanta</em>
              </>
            }
          />
          <div className="grid grid-cols-1 gap-7 min-[801px]:grid-cols-3 min-[801px]:gap-12">
            {why.map((item) => (
              <div key={item.n} className="border-t border-charcoal/10 pt-7">
                <div className="font-heading text-[54px] font-light leading-none text-gold">
                  {item.n}
                </div>
                <h3 className="mb-2.5 mt-[18px] font-heading text-[26px] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
                  {item.title}
                </h3>
                <p className="max-w-[290px] text-[15px] leading-[1.8] text-warmgray">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-[72px] min-[801px]:px-[60px] min-[801px]:py-[110px]">
        <div className="mx-auto max-w-[1080px]">
          <SectionHeading
            eyebrow="The niche I help you build"
            title={
              <>
                Where I can <em className="font-light italic text-gold">help</em>
              </>
            }
          />
          <div className="grid grid-cols-1 gap-7 min-[801px]:grid-cols-3 min-[801px]:gap-12">
            <div className="border border-brand bg-white px-9 py-12 text-center shadow-card">
              <svg viewBox="0 0 48 48" className="mx-auto mb-[22px] h-11 w-11" aria-hidden>
                <path d="M6 40h36M10 40V26M20 40V18M30 40V22M40 40V10" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold" />
              </svg>
              <h3 className="mb-2 font-heading text-[28px] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
                Investors
              </h3>
              <p className="text-[15px] leading-[1.8] text-warmgray">
                Serve clients buying for cash flow and long-term wealth.
              </p>
            </div>
            <div className="border border-brand bg-white px-9 py-12 text-center shadow-card">
              <svg viewBox="0 0 48 48" className="mx-auto mb-[22px] h-11 w-11 text-gold" aria-hidden>
                <path d="M8 22 24 9l16 13v18H8z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <path d="M24 22v18M8 30h32" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <h3 className="mb-2 font-heading text-[28px] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
                House hackers
              </h3>
              <p className="text-[15px] leading-[1.8] text-warmgray">
                Help buyers live in one part and rent out the rest.
              </p>
            </div>
            <div className="border border-brand bg-white px-9 py-12 text-center shadow-card">
              <svg viewBox="0 0 48 48" className="mx-auto mb-[22px] h-11 w-11 text-gold" aria-hidden>
                <circle cx="16" cy="18" r="5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="32" cy="18" r="5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="24" cy="30" r="5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <path d="M8 42c2-5 6-7 8-7M40 42c-2-5-6-7-8-7M17 46c2-5 4-7 7-7s5 2 7 7" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <h3 className="mb-2 font-heading text-[28px] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
                Coliving
              </h3>
              <p className="text-[15px] leading-[1.8] text-warmgray">
                Guide room-by-room rentals, from the offer to the first move-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-[72px] min-[801px]:px-[60px] min-[801px]:py-[110px]">
        <div className="mx-auto max-w-[1080px]">
          <SectionHeading
            eyebrow="Revenue share"
            title={
              <>
                In plain <em className="font-light italic text-gold">language</em>
              </>
            }
          />
          <div className="relative grid grid-cols-1 gap-[30px] min-[801px]:grid-cols-4 min-[801px]:gap-0">
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[22px] left-[22px] top-[22px] w-px bg-gold-light min-[801px]:bottom-auto min-[801px]:left-[12%] min-[801px]:right-[12%] min-[801px]:h-px min-[801px]:w-auto"
            />
            {steps.map((step) => (
              <div
                key={step.n}
                className="relative grid grid-cols-[44px_1fr] gap-x-[18px] text-left min-[801px]:block min-[801px]:px-[18px] min-[801px]:text-center"
              >
                <div className="row-span-2 flex h-11 w-11 items-center justify-center rounded-full bg-charcoal font-heading text-[20px] text-white min-[801px]:mx-auto min-[801px]:mb-[22px]">
                  {step.n}
                </div>
                <h3 className="mb-1.5 font-heading text-[22px] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[1.7] text-warmgray">{step.copy}</p>
              </div>
            ))}
          </div>
          <p className="mt-14 text-center text-[13px] leading-[1.8] text-warmgray-light">
            Happy to walk you through the details on a call.
          </p>
        </div>
      </section>

      <section className="px-6 py-[72px] min-[801px]:px-[60px] min-[801px]:py-[110px]">
        <div className="mx-auto max-w-[1080px]">
          <SectionHeading
            eyebrow="Community"
            title={
              <>
                You won&apos;t build it{" "}
                <em className="font-light italic text-gold">alone</em>
              </>
            }
          />
          <div className="grid grid-cols-1 gap-5 min-[801px]:grid-cols-2 min-[801px]:gap-8">
            <a
              href={HOUSE_HACKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-charcoal px-[30px] py-10 text-white min-[801px]:px-12 min-[801px]:py-[52px]"
            >
              <span className="eyebrow mb-0 text-gold-light before:bg-gold-light">Meetup</span>
              <h3 className="mb-2.5 mt-[18px] font-heading text-[34px] font-light leading-[1.08] tracking-[-0.02em] text-white">
                House Hacking Atlanta
              </h3>
              <p className="mb-[22px] text-[15px] leading-[1.8] text-warmgray-light">
                Learn the strategy, share deals and meet local investors every month.
              </p>
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
                househackingatl.com →
              </span>
            </a>
            <a
              href={ATLANTA_WOMEN_INVESTORS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-charcoal px-[30px] py-10 text-white min-[801px]:px-12 min-[801px]:py-[52px]"
            >
              <span className="eyebrow mb-0 text-gold-light before:bg-gold-light">
                Women in real estate
              </span>
              <h3 className="mb-2.5 mt-[18px] font-heading text-[34px] font-light leading-[1.08] tracking-[-0.02em] text-white">
                Atlanta Women Investors
              </h3>
              <p className="mb-[22px] text-[15px] leading-[1.8] text-warmgray-light">
                A warm network of women building wealth through real estate, together.
              </p>
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
                atlantawomeninvestors.com →
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-[72px] text-center min-[801px]:px-[60px] min-[801px]:py-[110px]">
        <div className="mx-auto max-w-[1080px]">
          <span className="eyebrow eyebrow-center mb-0">Curious?</span>
          <h2 className="mb-4 mt-[18px] font-heading text-[40px] font-light leading-[1.08] tracking-[-0.02em] text-charcoal min-[801px]:text-[56px]">
            Let&apos;s talk, <em className="font-light italic text-gold">no pressure</em>
          </h2>
          <p className="mb-9 text-[17px] leading-[1.8] text-warmgray">
            Twenty minutes, your questions, and an honest look at whether it&apos;s a fit.
          </p>
          <a className="btn-gold" href={BOOK_URL}>
            Book a 20-minute call
          </a>
          <div className="mt-[30px] flex flex-wrap items-center justify-center gap-7 text-[14px]">
            <a href="mailto:CV.SellsHomes@gmail.com" className="border-b border-charcoal/10 text-warmgray">
              CV.SellsHomes@gmail.com
            </a>
            <a href="tel:+16788844494" className="border-b border-charcoal/10 text-warmgray">
              678-884-4494
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
