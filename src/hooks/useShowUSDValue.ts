// hooks/useFrankfurterTimeseries.ts
import { useEffect, useMemo, useState } from "react";

export type RangeKey = '1D' | '1W' | '1M' | '3M' | '1Y' | 'All';
type Pt = { date: string; rate: number };

function rangeToStart(range: RangeKey) {
  const d = new Date();
  const end = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const start = new Date(end);
  switch (range) {
    case '1D': start.setDate(end.getDate() - 1); break;
    case '1W': start.setDate(end.getDate() - 7); break;
    case '1M': start.setMonth(end.getMonth() - 1); break;
    case '3M': start.setMonth(end.getMonth() - 3); break;
    case '1Y': start.setFullYear(end.getFullYear() - 1); break;
    case 'All': start.setFullYear(end.getFullYear() - 5); break;
  }
  const toISO = (x: Date) => x.toISOString().slice(0, 10);
  return { start: toISO(start), end: toISO(end) };
}

export function useShowUSDValue(base: string, quote: string, range: RangeKey) {
  const [data, setData] = useState<Pt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { start, end } = rangeToStart(range);
    const url = `https://api.frankfurter.app/${start}..${end}?from=${base}&to=${quote}`;
    const ctrl = new AbortController();

    setLoading(true);
    setError(null);

    fetch(url, { signal: ctrl.signal })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(json => {
        const rows: Pt[] = Object.entries(json.rates)
          .map(([date, v]: any) => ({ date, rate: v[quote] }))
          .sort((a, b) => a.date.localeCompare(b.date));
        setData(rows);
      })
      .catch(e => {
        if (e.name !== "AbortError") setError(e.message);
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [base, quote, range]);

  const latest = data.at(-1)?.rate ?? null;

  const change7d = useMemo(() => {
    if (!data.length) return null;
    const last = data.at(-1)!.rate;
    const idx = Math.max(0, data.length - 7 - 1);
    const baseV = data[idx].rate;
    const pct = ((last - baseV) / baseV) * 100;
    return { base: baseV, last, pct };
  }, [data]);

  return { data, loading, error, latest, change7d } as const;
}
