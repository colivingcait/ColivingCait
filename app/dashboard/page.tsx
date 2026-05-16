import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, getUserPurchases } from "@/lib/auth/helpers";
import { getCourse, courses } from "@/lib/courses";
import { supabase } from "@/lib/supabase";
import BuyButton from "@/components/courses/BuyButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "My Courses — Coliving Cait",
  description: "Access your purchased courses and track your progress.",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/signin?callbackUrl=/dashboard");
  }

  const purchasedSlugs = await getUserPurchases(user.id);

  const { data: progressData } = await supabase
    .from("progress")
    .select("course_slug, lesson_slug")
    .eq("user_id", user.id);

  const progressMap: Record<string, string[]> = {};
  for (const row of progressData ?? []) {
    if (!progressMap[row.course_slug]) progressMap[row.course_slug] = [];
    progressMap[row.course_slug].push(row.lesson_slug);
  }

  const availableCourses = courses.filter((c) => c.status === "available");
  const allCourseSlugs = ["coliving-101", "house-hacking-101", "real-estate-101"];
  const ownsAll = allCourseSlugs.every((s) => purchasedSlugs.includes(s));

  return (
    <div className="mx-auto w-full max-w-3xl px-6 md:px-10 py-12 md:py-20">
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-4">
        ✦ My courses
      </p>
      <h1 className="font-heading text-4xl md:text-5xl leading-heading text-charcoal mb-2">
        Welcome back{user.name ? `, ${user.name}` : ""}.
      </h1>
      <p className="text-warmgray leading-body mb-10">
        Pick up where you left off or start something new.
      </p>

      {/* ── Bundle offer (top) ── */}
      {!ownsAll && (
        <div className="border-2 border-gold bg-gold/[0.06] p-5 mb-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-1">
                ✦ Best value
              </p>
              <p className="font-heading text-lg leading-heading text-charcoal">
                Explorer Bundle
              </p>
              <p className="text-sm text-warmgray mt-0.5">
                All 3 courses{" "}
                <span className="text-gold font-medium">
                  + free 30-min strategy call
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-heading text-lg text-charcoal">
                <span className="line-through text-warmgray/40 text-sm mr-1">
                  $297
                </span>
                $149
              </p>
              <BuyButton
                courseSlug="bundle"
                className="bg-gold text-charcoal px-5 py-2 text-[11px] uppercase tracking-eyebrow hover:bg-gold/80 transition-colors"
              >
                Get bundle →
              </BuyButton>
            </div>
          </div>
        </div>
      )}

      {/* ── Free strategy call (if they own the bundle) ── */}
      {ownsAll && (
        <Link
          href="https://calendly.com/colivingcait/explorer-courses-30-min-strategy-call"
          target="_blank"
          className="block border-2 border-gold bg-gold/[0.06] p-5 mb-6 hover:bg-gold/[0.12] transition-colors"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-1">
                ✦ Included with your bundle
              </p>
              <p className="font-heading text-lg leading-heading text-charcoal">
                Free 30-Minute Strategy Call
              </p>
              <p className="text-sm text-warmgray mt-0.5">
                Talk through your coliving goals with Cait — on the house.
              </p>
            </div>
            <span className="text-sm text-gold font-medium whitespace-nowrap">
              Book now →
            </span>
          </div>
        </Link>
      )}

      {/* ── Course list ── */}
      <div className="space-y-3">
        {availableCourses.map((course) => {
          const purchased = purchasedSlugs.includes(course.slug);
          const completed = progressMap[course.slug] ?? [];
          const totalLessons = course.lessons.length;
          const pct =
            totalLessons > 0
              ? Math.round((completed.length / totalLessons) * 100)
              : 0;
          const nextLesson = course.lessons.find(
            (l) => !completed.includes(l.slug),
          );
          const resumeHref = nextLesson
            ? `/courses/${course.slug}/${nextLesson.slug}`
            : `/courses/${course.slug}/overview`;

          if (purchased) {
            return (
              <Link
                key={course.slug}
                href={resumeHref}
                className="group flex items-center gap-4 border border-brand p-4 hover:border-gold transition-all duration-300"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 border border-brand bg-cream/50">
                  <span className="font-heading text-sm text-charcoal">
                    {course.symbol}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-heading text-base leading-heading text-charcoal group-hover:text-gold transition-colors truncate">
                      {course.title}
                    </p>
                    <span className="text-[10px] uppercase tracking-eyebrow text-gold whitespace-nowrap">
                      {pct === 100
                        ? "Complete"
                        : pct > 0
                          ? `${pct}%`
                          : "New"}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 bg-brand overflow-hidden">
                    <div
                      className="h-full bg-gold transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-warmgray/50 truncate">
                    {nextLesson ? `Next: ${nextLesson.title}` : "Review anytime"}
                  </p>
                </div>
                <span className="text-[11px] text-gold whitespace-nowrap hidden sm:block">
                  {pct === 100 ? "Review →" : "Continue →"}
                </span>
              </Link>
            );
          }

          return (
            <div
              key={course.slug}
              className="flex items-center gap-4 border border-brand p-4"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 border border-brand bg-cream/30">
                <span className="font-heading text-sm text-warmgray/50">
                  {course.symbol}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading text-base leading-heading text-charcoal truncate">
                  {course.title}
                </p>
                <p className="text-[11px] text-warmgray/50">
                  {totalLessons} lessons · ${course.price}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/courses/${course.slug}`}
                  className="text-[11px] text-warmgray hover:text-charcoal transition-colors hidden sm:block"
                >
                  Details
                </Link>
                <BuyButton
                  courseSlug={course.slug}
                  className="bg-charcoal text-cream px-4 py-2 text-[11px] uppercase tracking-eyebrow hover:bg-gold transition-colors"
                >
                  Buy →
                </BuyButton>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Coaching & consulting ── */}
      <section className="mt-14 pt-10 border-t border-brand">
        <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
          ✦ Go deeper
        </p>
        <h2 className="font-heading text-2xl leading-heading text-charcoal mb-6">
          Ready for the next step?
        </h2>

        <div className="space-y-3">
          <Link
            href="/learn#the-builder"
            className="group flex items-center gap-4 bg-charcoal p-4 hover:bg-charcoal/90 transition-colors"
          >
            <div className="flex-1">
              <p className="font-heading text-base text-cream">The Builder</p>
              <p className="text-[11px] text-cream/60 mt-0.5">
                1:1 coaching · Build your portfolio in 3 months
              </p>
            </div>
            <span className="text-sm text-gold whitespace-nowrap">
              $4,500 →
            </span>
          </Link>

          <Link
            href="/learn#the-operator"
            className="group flex items-center gap-4 border border-brand p-4 hover:border-gold transition-colors"
          >
            <div className="flex-1">
              <p className="font-heading text-base text-charcoal">
                The Operator
              </p>
              <p className="text-[11px] text-warmgray/60 mt-0.5">
                Monthly consulting · Scale and optimize your portfolio
              </p>
            </div>
            <span className="text-sm text-gold whitespace-nowrap">
              $1,000/mo →
            </span>
          </Link>

          <Link
            href="https://calendly.com/colivingcait/strategy-session"
            target="_blank"
            className="group flex items-center gap-4 border border-brand p-4 hover:border-gold transition-colors"
          >
            <div className="flex-1">
              <p className="font-heading text-base text-charcoal">
                Strategy Session
              </p>
              <p className="text-[11px] text-warmgray/60 mt-0.5">
                1 hour with Cait · Map out your next move
              </p>
            </div>
            <span className="text-sm text-gold whitespace-nowrap">$250 →</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
