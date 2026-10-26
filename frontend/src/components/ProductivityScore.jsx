
function ProductivityScore({ todos }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayTasks = todos.filter((todo) => {
    if (!todo.dueDate) return false;

    const dueDate = new Date(todo.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate.getTime() === today.getTime();
  });

  const completedToday = todayTasks.filter(
    (todo) => todo.completed
  ).length;

  const score =
    todayTasks.length === 0
      ? 0
      : Math.round((completedToday / todayTasks.length) * 100);

  const message =
    todayTasks.length === 0
      ? "No tasks scheduled today"
      : score === 100
        ? "Excellent work!"
        : score >= 70
          ? "Great progress!"
          : score >= 40
            ? "Keep going!"
            : "One task at a time!";

  const circumference = 2 * Math.PI * 38;

  return (
    <section className="rounded-2xl border border-white/10 bg-[#151D31] p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-white">
        Productivity Score
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Based on today's scheduled tasks
      </p>

      <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div>
          <p className="text-4xl font-black text-purple-300">
            {score}<span className="text-xl text-gray-400">/100</span>
          </p>

          <p className="mt-2 text-sm font-medium text-emerald-400">
            {message}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            {completedToday} of {todayTasks.length} tasks completed
          </p>
        </div>

        <svg
          viewBox="0 0 100 100"
          className="h-28 w-28 -rotate-90"
          role="img"
          aria-label={`Productivity score ${score} out of 100`}
        >
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#30384D"
            strokeWidth="9"
          />

          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#A78BFA"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * circumference} ${circumference}`}
            className="transition-all duration-500"
          />
        </svg>
      </div>
    </section>
  );
}

export default ProductivityScore;
