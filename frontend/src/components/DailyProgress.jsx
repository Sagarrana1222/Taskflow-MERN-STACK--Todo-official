
function DailyProgress({ todos }) {
  const today = new Date().toDateString();

  const completedToday = todos.filter((todo) => {
    return (
      todo.completed &&
      todo.completedAt &&
      new Date(todo.completedAt).toDateString() === today
    );
  }).length;

  const totalToday = todos.filter((todo) => {
    return (
      todo.completedAt &&
      new Date(todo.completedAt).toDateString() === today
    );
  }).length;

  const progress =
    totalToday === 0
      ? 0
      : Math.round((completedToday / totalToday) * 100);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#151D31] p-5">
      <h2 className="text-lg font-semibold text-white">
        Daily Progress
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Your productivity today
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-gray-300">
          Tasks completed today
        </span>

        <span className="font-bold text-purple-300">
          {completedToday}
        </span>
      </div>

      <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-gray-400">
        {progress}% progress
      </p>
    </div>
  );
}

export default DailyProgress;
