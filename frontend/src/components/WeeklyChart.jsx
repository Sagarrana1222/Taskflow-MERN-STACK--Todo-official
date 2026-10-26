
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function WeeklyChart({ todos }) {
  const today = new Date();

  const weekData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));

    const day = date.toLocaleDateString("en-US", {
      weekday: "short",
    });

    const dateKey = date.toDateString();

    const completed = todos.filter((todo) => {
      return (
        todo.completed &&
        todo.completedAt &&
        new Date(todo.completedAt).toDateString() === dateKey
      );
    }).length;

    return { day, completed };
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-[#151D31] p-5">
      <h2 className="text-lg font-semibold text-white">
        Weekly Productivity
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Tasks completed in the last 7 days
      </p>

      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weekData}>
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
            <Bar
              dataKey="completed"
              name="Completed Tasks"
              fill="#A78BFA"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeeklyChart;
