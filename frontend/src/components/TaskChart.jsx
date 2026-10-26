
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function TaskChart({ completedCount, pendingCount }) {
  const data = [
    { name: "Completed", value: completedCount },
    { name: "Pending", value: pendingCount },
  ];

  const COLORS = ["#A78BFA", "#3B82F6"];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#151D31] p-5">
      <h2 className="text-lg font-semibold text-white">
        Task Completion
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Your current productivity
      </p>

      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "12px",
                color: "#FFFFFF",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 text-sm">
        <p className="text-purple-300">
          ● Completed: {completedCount}
        </p>
        <p className="text-blue-300">
          ● Pending: {pendingCount}
        </p>
      </div>
    </div>
  );
}

export default TaskChart;
