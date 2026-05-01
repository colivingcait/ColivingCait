// Lightweight client-side visitor identity. Once a visitor submits any
// form (lead magnet, contact, buyer inquiry, calculator), we cache their
// email locally so future page-visit tags can fire against the same
// subscriber without re-prompting.

const KEY_EMAIL = "coliving-cait:visitor:email";
const KEY_FIRST_NAME = "coliving-cait:visitor:first-name";
const KEY_FIRED_VISIT_TAGS = "coliving-cait:visitor:fired-visit-tags";

export function rememberVisitor(email: string, firstName?: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY_EMAIL, email);
    if (firstName) window.localStorage.setItem(KEY_FIRST_NAME, firstName);
  } catch (err) {
    // localStorage may be disabled — silently ignore
  }
}

export function getVisitorEmail(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(KEY_EMAIL);
  } catch (err) {
    return null;
  }
}

export function getVisitorFirstName(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(KEY_FIRST_NAME);
  } catch (err) {
    return null;
  }
}

// Returns true if we should fire the visit tag for this page (i.e. it
// hasn't been fired before this session for this email).
export function shouldFireVisitTag(tag: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(KEY_FIRED_VISIT_TAGS);
    const fired: string[] = raw ? JSON.parse(raw) : [];
    return !fired.includes(tag);
  } catch (err) {
    return true;
  }
}

export function markVisitTagFired(tag: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(KEY_FIRED_VISIT_TAGS);
    const fired: string[] = raw ? JSON.parse(raw) : [];
    if (!fired.includes(tag)) {
      fired.push(tag);
      window.localStorage.setItem(KEY_FIRED_VISIT_TAGS, JSON.stringify(fired));
    }
  } catch (err) {
    // ignore
  }
}
