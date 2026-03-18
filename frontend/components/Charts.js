import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

const studentGrowthData = [
  { month: "Jan", students: 120 },
  { month: "Feb", students: 138 },
  { month: "Mar", students: 150 },
  { month: "Apr", students: 162 },
  { month: "May", students: 181 },
  { month: "Jun", students: 196 },
];

const attendanceData = [
  { day: "Mon", attendance: 78 },
  { day: "Tue", attendance: 82 },
  { day: "Wed", attendance: 74 },
  { day: "Thu", attendance: 86 },
  { day: "Fri", attendance: 80 },
  { day: "Sat", attendance: 91 },
];

const revenueData = [
  { month: "Jan", revenue: 2.1 },
  { month: "Feb", revenue: 2.4 },
  { month: "Mar", revenue: 2.2 },
  { month: "Apr", revenue: 2.8 },
  { month: "May", revenue: 3.0 },
  { month: "Jun", revenue: 3.2 },
];

const programDistributionData = [
  { name: "Beginner", value: 40 },
  { name: "Intermediate", value: 30 },
  { name: "High Performance", value: 15 },
  { name: "Adult", value: 10 },
  { name: "Kids", value: 5 },
];

const COLORS = ["#38bdf8", "#22c55e", "#f97316", "#eab308", "#a855f7"];

export function DashboardCharts() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <div className="col-span-2 rounded-2xl border border-slate-800 bg-slate-950 p-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-200">
          Student Growth
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={studentGrowthData}>
              <CartesianGrid stroke="#0f172a" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  borderColor: "#1e293b",
                  borderRadius: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#facc15"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-200">
          Program Distribution
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={programDistributionData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={78}
              >
                {programDistributionData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  borderColor: "#1e293b",
                  borderRadius: 12,
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-200">
          Training Attendance
        </h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData}>
              <CartesianGrid stroke="#0f172a" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  borderColor: "#1e293b",
                  borderRadius: 12,
                }}
              />
              <Bar dataKey="attendance" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-950 p-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-200">
          Revenue (₹ Lakh)
        </h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid stroke="#0f172a" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  borderColor: "#1e293b",
                  borderRadius: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

