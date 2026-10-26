
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ProductivityChart({ todos }) {
  const today = new Date();

  const trendData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));

    const completed = todos.filter((todo) => {
      return (
        todo.completed &&
        todo.completedAt &&
        new Date(todo.completedAt).toDateString() === date.toDateString()
      );
    }).length;

    return {
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      completed,
    };
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-[#151D31] p-5">
      <h2 className="text-lg font-semibold text-white">
        Productivity Trend
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Your daily task completion over 7 days
      </p>

      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#273249" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis allowDecimals={false} stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "12px",
                color: "#FFFFFF",
              }}
            />
            <Line
              type="monotone"
              dataKey="completed"
              name="Completed Tasks"
              stroke="#A78BFA"
              strokeWidth={3}
              dot={{ r: 4, fill: "#A78BFA" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProductivityChart;
