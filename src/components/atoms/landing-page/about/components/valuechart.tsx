import { Colors, greenGradientBorder } from '@/constants';
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
    YAxis
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
        <Box sx={{
            background: Colors.gradientBg,
            color: 'white',
            padding: '10px 12px',
            borderRadius: 10,
            "&::before": greenGradientBorder,
            fontSize: 12,
        }}>
            <div style={{ opacity: 0.8 }}>{fmtDate(label)}</div>
            <div style={{ marginTop: 4 }}>
                1 USD = {v.toFixed(2)} EUR
            </div>
        </Box>
    );
}

type Pt = { date: string; rate: number };

export default function ValueChart() {
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
            width: "100%",
            maxWidth: "320px",
            padding: "20px 16px",
            borderRadius: "16px",
            position: "relative",
            alignSelf: "flex-start",
            height: "auto",
            flex: "0 0 auto",
            "&::before": greenGradientBorder,
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
            <div style={{ width: "100%", height: 120 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data.map(d => ({ name: d.date, value: d.rate }))}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                        <XAxis
                            dataKey="name"
                            tickFormatter={(d) => new Date(d + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            stroke="rgba(255,255,255,0.4)"
                            tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.6)' }}
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            tickFormatter={(v) => v.toFixed(2)}
                            stroke="rgba(255,255,255,0.4)"
                            tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.6)' }}
                        />
                        <Tooltip content={<FxTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#35c2c4"
                            strokeWidth={1}
                            connectNulls
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            {r}
                        </button>
                    ))}
                </div>
                <Box sx={{
                    position: "relative",
                    background: Colors.gradientBg,
                    borderRadius: "16px",
                    padding: '6px 6px',
                    width: "40px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    "&::before": greenGradientBorder
                }}>
                    <div style={{ fontSize: "8px", fontWeight: 700, color: Colors.white, fontStyle: "italic" }}>1 USD =</div>
                    <div style={{ fontSize: "8px", fontWeight: 700, color: Colors.white, fontStyle: "italic" }}>
                        {latest ? `${latest.toFixed(2)} EUR` : (loading ? '—' : 'N/A')}
                    </div>
                    <div style={{ fontSize: "8px", fontWeight: 400, fontStyle: "italic", color: (change7d && change7d.pct >= 0) ? '##11EFC4' : '#ff6b6b' }}>
                        {change7d ? `${change7d.pct >= 0 ? '+' : ''}${change7d.pct.toFixed(1)}% (7D)` : ''}
                    </div>
                </Box>
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
