const rows = [
  {
    student: "Aarav Sharma",
    program: "High Performance",
    date: "2026-03-15",
    status: "Completed Session",
  },
  {
    student: "Diya Patel",
    program: "Beginner",
    date: "2026-03-15",
    status: "New Enrollment",
  },
  {
    student: "Rahul Menon",
    program: "Intermediate",
    date: "2026-03-14",
    status: "Payment Received",
  },
  {
    student: "Sara Khan",
    program: "Kids",
    date: "2026-03-14",
    status: "Marked Present",
  },
];

export function ActivityTable() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <h2 className="mb-3 text-sm font-semibold text-slate-200">
        Recent Activity
      </h2>
      <div className="overflow-x-auto text-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-slate-900 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Student Name</th>
              <th className="px-3 py-2 text-left font-medium">Program</th>
              <th className="px-3 py-2 text-left font-medium">Date</th>
              <th className="px-3 py-2 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={`${row.student}-${row.date}`}
                className="border-b border-slate-800 last:border-0 hover:bg-slate-900/60"
              >
                <td className="px-3 py-2 text-slate-100">{row.student}</td>
                <td className="px-3 py-2 text-slate-300">{row.program}</td>
                <td className="px-3 py-2 text-slate-400">{row.date}</td>
                <td className="px-3 py-2 text-emerald-400">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

