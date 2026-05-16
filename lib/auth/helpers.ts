import { getServerSession } from "next-auth";
import { authOptions } from "./config";
import { supabase } from "@/lib/supabase";

// Get the current authenticated user. Returns null if not signed in.
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  return {
    id: (session.user as any).id as string,
    email: session.user.email,
    name: session.user.name ?? null,
  };
}

// Check if a user has purchased a specific course.
export async function hasAccess(
  userId: string,
  courseSlug: string,
): Promise<boolean> {
  const { data } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("course_slug", courseSlug)
    .single();
  return !!data;
}

// Get all course slugs a user has purchased.
export async function getUserPurchases(userId: string): Promise<string[]> {
  const { data } = await supabase
    .from("purchases")
    .select("course_slug")
    .eq("user_id", userId);
  return (data ?? []).map((row) => row.course_slug);
}
