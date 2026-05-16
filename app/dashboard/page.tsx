import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, getUserPurchases } from "@/lib/auth/helpers";
import { getCourse, courses } from "@/lib/courses";
import { supabase } from "@/lib/supabase";
import BuyButton from "@/components/courses/BuyButton";
import UpsellSection from "@/components/courses/UpsellSection";

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

  // Get progress for each purchased course
  const { data: progressData } = await supabase
    .from("progress")
    .select("course_slug, lesson_slug")
    .eq("user_id", user.id);

  const progressMap: Record<string, string[]> = {};
  for (const row of progressData ?? []) {
    if (!progressMap[row.course_slug]) progressMap[row.course_slug] = [];
    progressMap[row.course_slug].push(row.lesson_slug);
  }

  // Show all available courses
  const availableCourses = courses.filter((c) => c.status === "available");

  // Determine which upsells to exclude
  const excludeUpsells: string[] = [];
  const allCourseSlugs = ["coliving-101", "house-hacking-101", "real-estate-101"];
  const ownsAll = allCourseSlugs.every((s) => purchasedSlugs.includes(s));
  if (ownsAll) excludeUpsells.push("Explorer Bundle");

  return (
    <div className="mx-auto w-full max-w-4xl px-6 md:px-10 py-12 md:py-20">
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-4">
        ✦ My courses
      </p>
      <h1 className="font-heading text-4xl md:text-5xl leading-heading text-charcoal mb-2">
        Welcome back{user.name ? `, ${user.name}` : ""}.
      </h1>
      <p className="text-warmgray leading-body mb-12">
        Pick up where you left off or start something new.
      </p>

      <div className="space-y-4">
        {availableCourses.map((course) => {
          const purchased = purchasedSlugs.includes(course.slug);
          const completed = progressMap[course.slug] ?? [];
          const totalLessons = course.lessons.length;
          const pct =
            totalLessons > 0
              ? Math.round((completed.length / totalLessons) * 100)
              : 0;

          // Find next incomplete lesson
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
                className="group block border border-brand p-6 hover:border-gold transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-2">
                      {pct === 100
                        ? "✦ Completed"
                        : pct > 0
                          ? `✦ ${pct}% complete`
                          : "✦ Purchased · Not started"}
                    </p>
                    <p className="font-heading text-xl md:text-2xl leading-heading text-charcoal group-hover:text-gold transition-colors">
                      {course.title}
                    </p>
                    <p className="mt-1 text-sm text-warmgray">
                      {course.tagline}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 border border-brand bg-cream/50">
                    <span className="font-heading text-lg text-charcoal">
                      {course.symbol}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="h-1 bg-brand overflow-hidden">
                    <div
                      className="h-full bg-gold transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-warmgray/60">
                    {completed.length} of {totalLessons} lessons ·{" "}
                    {nextLesson
                      ? `Next: ${nextLesson.title}`
                      : "Review anytime"}
                  </p>
                </div>
              </Link>
            );
          }

          // Not purchased — show course info + buy button
          return (
            <div
              key={course.slug}
              className="border border-brand p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-eyebrow text-warmgray/50 mb-2">
                    ✦ Not yet purchased
                  </p>
                  <p className="font-heading text-xl md:text-2xl leading-heading text-charcoal">
                    {course.title}
                  </p>
                  <p className="mt-1 text-sm text-warmgray">
                    {course.tagline}
                  </p>
                  <p className="mt-1 text-sm text-warmgray/60">
                    {totalLessons} lessons
                  </p>
                </div>
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 border border-brand bg-cream/30">
                  <span className="font-heading text-lg text-warmgray/50">
                    {course.symbol}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  {course.originalPrice ? (
                    <p className="font-heading text-lg text-charcoal">
                      <span className="line-through text-warmgray/40 text-sm mr-1">
                        ${course.originalPrice}
                      </span>
                      ${course.price}
                    </p>
                  ) : (
                    <p className="font-heading text-lg text-charcoal">
                      ${course.price}
                    </p>
                  )}
                </div>
                <div className="flex gap-3 items-center">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="text-sm text-warmgray hover:text-charcoal transition-colors"
                  >
                    Details
                  </Link>
                  <BuyButton
                    courseSlug={course.slug}
                    className="bg-charcoal text-cream px-5 py-2.5 text-[11px] uppercase tracking-eyebrow hover:bg-gold transition-colors"
                  >
                    Purchase →
                  </BuyButton>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bundle offer — only if they don't own all three */}
        {!ownsAll && (
          <div className="border border-gold bg-gold/[0.06] p-6 mt-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-2">
                  ✦ Save with the bundle
                </p>
                <p className="font-heading text-xl md:text-2xl leading-heading text-charcoal">
                  Explorer Bundle
                </p>
                <p className="mt-1 text-sm text-warmgray">
                  Get all three courses together at a discount. The complete
                  foundation for your coliving journey.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="font-heading text-lg text-charcoal">
                <span className="line-through text-warmgray/40 text-sm mr-1">
                  $297
                </span>
                $149
              </p>
              <BuyButton
                courseSlug="bundle"
                className="bg-gold text-charcoal px-5 py-2.5 text-[11px] uppercase tracking-eyebrow hover:bg-gold/80 transition-colors"
              >
                Purchase bundle →
              </BuyButton>
            </div>
          </div>
        )}
      </div>

      {/* Upsell section — coaching, consulting, strategy */}
      <UpsellSection exclude={[...excludeUpsells, "Explorer Bundle"]} />
    </div>
  );
}
