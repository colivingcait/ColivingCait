// Tiny className combiner — keeps base components free of extra deps.
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}
