// Small numeric helpers shared by classify.ts and metrics.ts.

export const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

export function mean(xs: number[]): number | null {
  return xs.length ? sum(xs) / xs.length : null;
}

/** Linear-interpolated quantile (same as Excel QUARTILE.INC / numpy default). */
export function quantile(xs: number[], q: number): number | null {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  const pos = (s.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return s[lo] + (s[hi] - s[lo]) * (pos - lo);
}

export const median = (xs: number[]) => quantile(xs, 0.5);

export function min(xs: number[]): number | null {
  return xs.length ? Math.min(...xs) : null;
}

export function max(xs: number[]): number | null {
  return xs.length ? Math.max(...xs) : null;
}

export function pearson(xs: number[], ys: number[]): number | null {
  const n = Math.min(xs.length, ys.length);
  if (n < 3) return null;
  const mx = sum(xs.slice(0, n)) / n;
  const my = sum(ys.slice(0, n)) / n;
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i] - mx;
    const dy = ys[i] - my;
    sxy += dx * dy;
    sxx += dx * dx;
    syy += dy * dy;
  }
  if (sxx === 0 || syy === 0) return null;
  return sxy / Math.sqrt(sxx * syy);
}

/** n / d, or null when there is nothing to divide by. */
export function ratio(n: number, d: number): number | null {
  return d > 0 ? n / d : null;
}

export function groupBy<T, K>(xs: T[], key: (x: T) => K): Map<K, T[]> {
  const m = new Map<K, T[]>();
  for (const x of xs) {
    const k = key(x);
    const list = m.get(k);
    if (list) list.push(x);
    else m.set(k, [x]);
  }
  return m;
}
