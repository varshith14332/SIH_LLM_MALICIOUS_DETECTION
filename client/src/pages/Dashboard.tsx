import React from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface AnalyticsResponse {
  weekly?: { week: string; detections: number }[];
  aiVsHuman?: { label: string; value: number }[];
}

type State = {
  data: AnalyticsResponse | null;
  error: string | null;
};

export default class Dashboard extends React.Component<{}, State> {
  state: State = { data: null, error: null };

  async componentDidMount() {
    try {
      const res = await fetch("/api/analytics");
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Failed to load");
      this.setState({ data: json });
    } catch (e: any) {
      this.setState({
        error: e.message,
        data: {
          weekly: Array.from({ length: 8 }).map((_, i) => ({
            week: `W${i + 1}`,
            detections: Math.round(20 + Math.random() * 80),
          })),
          aiVsHuman: [
            { label: "AI-generated", value: 61 },
            { label: "Human", value: 39 },
          ],
        },
      });
    }
  }

  render() {
    const { data, error } = this.state;
    const weekly = data?.weekly || [];
    const pie = data?.aiVsHuman || [];
    const COLORS = ["#7A00FF", "#00FFFF"];

    return (
      <div className="container py-12 space-y-8">
        <h2 className="font-heading text-3xl text-cyan-300">
          Threat Analytics
        </h2>
        {error && (
          <div className="glass neon-border rounded-xl p-4 text-red-300">
            {error}
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass neon-border rounded-xl p-4"
          >
            <h3 className="text-foreground/80 mb-2">Weekly Detections</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weekly}>
                  <XAxis dataKey="week" stroke="rgba(255,255,255,.4)" />
                  <YAxis stroke="rgba(255,255,255,.4)" />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(20,24,38,0.9)",
                      border: "1px solid rgba(255,255,255,.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="detections"
                    stroke="#00FFFF"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass neon-border rounded-xl p-4"
          >
            <h3 className="text-foreground/80 mb-2">AI-generated vs Human</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pie}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                  >
                    {pie.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
}
