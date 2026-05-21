import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { supabase } from "@/lib/supabase";

// GET /api/progress?course=coliving-101
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ completed: [] });
  }
  const userId = (session.user as any).id;
  const courseSlug = req.nextUrl.searchParams.get("course");
  if (!courseSlug) {
    return NextResponse.json({ completed: [] });
  }

  const { data } = await supabase
    .from("progress")
    .select("lesson_slug")
    .eq("user_id", userId)
    .eq("course_slug", courseSlug);

  return NextResponse.json({
    completed: (data ?? []).map((r) => r.lesson_slug),
  });
}

// POST /api/progress — { courseSlug, lessonSlug, action: "complete" | "incomplete" }
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const userId = (session.user as any).id;
  const { courseSlug, lessonSlug, action } = await req.json();

  if (action === "complete") {
    await supabase.from("progress").upsert(
      { user_id: userId, course_slug: courseSlug, lesson_slug: lessonSlug },
      { onConflict: "user_id,course_slug,lesson_slug" },
    );
  } else {
    await supabase
      .from("progress")
      .delete()
      .eq("user_id", userId)
      .eq("course_slug", courseSlug)
      .eq("lesson_slug", lessonSlug);
  }

  return NextResponse.json({ ok: true });
}
