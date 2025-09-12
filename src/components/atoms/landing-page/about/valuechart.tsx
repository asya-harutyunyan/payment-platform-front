import { Colors } from '@/constants';
import { H6 } from '@/styles/typography';
import { Box } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';


const fmtDate = (iso: string) =>
    new Date(iso + 'T00:00:00').toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

type RangeKey = '1D' | '1W' | '1M' | '3M' | '1Y' | 'All';

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


function FxTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    const v = payload[0].value as number;
    return (
        <div style={{
            background: 'rgba(10,20,40,0.9)',
            color: 'white',
            padding: '10px 12px',
            borderRadius: 10,
            boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
            fontSize: 12,
        }}>
            <div style={{ opacity: 0.8 }}>{fmtDate(label)}</div>
            <div style={{ marginTop: 4, fontWeight: 600 }}>
                1 USD = {v.toFixed(2)} EUR
            </div>
        </div>
    );
}

type Pt = { date: string; rate: number };

export default function FxChart() {
    const [range, setRange] = useState<RangeKey>('1W');
    const [data, setData] = useState<Pt[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const { start, end } = rangeToStart(range);
        const url =
            `https://api.frankfurter.app/${start}..${end}?from=USD&to=EUR`;
        setLoading(true);
        setError(null);
        fetch(url)
            .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then(json => {
                const rows: Pt[] = Object.entries(json.rates)
                    .map(([date, v]: any) => ({ date, rate: v.EUR }))
                    .sort((a, b) => a.date.localeCompare(b.date));
                setData(rows);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [range]);

    const latest = data.at(-1)?.rate ?? null;

    const change7d = useMemo(() => {
        if (!data.length) return null;
        const last = data.at(-1)!.rate;
        const idx = Math.max(0, data.length - 7 - 1);
        const base = data[idx].rate;
        const pct = ((last - base) / base) * 100;
        return { base, last, pct };
    }, [data]);

    return (
        <Box sx={{
            width: 396,
            padding: "34px 20px",
            borderRadius: "16px",
            position: "relative",
            "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "16px",
                padding: "1px",
                background:
                    "linear-gradient(360deg, rgba(43,255,255,0.8) 0%, rgba(43,255,255,0.2) 100%)",
                WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                pointerEvents: "none",
            },

        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <H6 style={{ fontSize: "10.68px", fontWeight: 700, color: Colors.white, fontStyle: "italic" }}>
                    Динамика валютных курсов
                </H6>

                <div style={{ display: 'flex', gap: "4.45px" }}>
                    <Box
                        width="54px"
                        sx={{
                            background: 'white',
                            borderRadius: "5px",
                            padding: '3px 7px',

                        }}>
                        <H6 sx={{ fontSize: "6.23px", color: "#111", p: "0", textAlign: "center" }}>
                            USD / EUR
                        </H6>
                    </Box>
                    <Box
                        width="22px"
                        sx={{
                            background: 'white',
                            borderRadius: "5px",
                            padding: '3px 7px',

                        }}>
                        <H6 sx={{ fontSize: "6.23px", color: "#111", p: "0", textAlign: "center" }}>
                            {range}
                        </H6>
                    </Box>
                </div>
            </div>

            {/* Chart */}
            <div style={{ width: '100%', height: 220, marginTop: 8 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data.map(d => ({ name: d.date, value: d.rate }))}
                        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                        <XAxis
                            dataKey="name"
                            tickFormatter={(d) => new Date(d + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            stroke="rgba(255,255,255,0.4)"
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            tickFormatter={(v) => v.toFixed(2)}
                            stroke="rgba(255,255,255,0.4)"
                        />
                        <Tooltip content={<FxTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#38E1D7"
                            dot={{ r: 3, stroke: '#0b1530', strokeWidth: 2 }}
                            strokeWidth={2.25}
                            connectNulls
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Footer: range buttons + current pill */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                    {(['1D', '1W', '1M', '3M', '1Y', 'All'] as RangeKey[]).map(r => (
                        <button
                            key={r}
                            onClick={() => setRange(r)}
                            style={{
                                background: 'transparent',
                                color: "#6B7280",
                                border: 'none',
                                borderBottom: r === range ? '2px solid #79b4fb' : '2px solid transparent',
                                padding: '8px 2px',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >

                            {r}
                        </button>
                    ))}
                </div>

                <div style={{
                    background: 'rgba(56,225,215,0.1)',
                    border: '1px solid rgba(56,225,215,0.35)',
                    borderRadius: 12,
                    padding: '10px 12px',
                    minWidth: 130,
                    textAlign: 'right',
                    lineHeight: 1.25
                }}>
                    <div style={{ fontWeight: 800, fontSize: 12 }}>1 USD =</div>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>
                        {latest ? `${latest.toFixed(2)} EUR` : (loading ? '—' : 'N/A')}
                    </div>
                    <div style={{ fontSize: 12, color: (change7d && change7d.pct >= 0) ? '#38E1D7' : '#ff6b6b' }}>
                        {change7d ? `${change7d.pct >= 0 ? '+' : ''}${change7d.pct.toFixed(1)}% (7D)` : ''}
                    </div>
                </div>
            </div>

            {
                error && (
                    <div style={{ marginTop: 8, color: '#ff6b6b', fontSize: 12 }}>
                        Couldn’t load rates: {error}
                    </div>
                )
            }
        </Box >
    );
}
