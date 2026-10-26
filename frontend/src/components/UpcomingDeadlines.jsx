
function UpcomingDeadlines({ todos, setActiveSection }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const upcomingTodos = todos
    .filter((todo) => {
      if (todo.completed || !todo.dueDate) return false;

      const dueDate = new Date(todo.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      return dueDate >= today && dueDate <= nextWeek;
    })
    .sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );

  return (
    <section className="rounded-2xl border border-white/10 bg-[#151D31] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Upcoming Deadlines
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Tasks due in the next 7 days
          </p>
        </div>

        <span className="rounded-full bg-purple-500/15 px-3 py-1 text-sm text-purple-300">
          {upcomingTodos.length}
        </span>
      </div>

      {upcomingTodos.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/10 p-5 text-center text-sm text-gray-400">
          No upcoming deadlines. You're all caught up!
        </p>
      ) : (
        <div className="space-y-3">
          {upcomingTodos.map((todo) => (
            <div
              key={todo._id}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3"
            >
              <p className="min-w-0 break-words text-sm font-medium text-gray-200">
                {todo.title}
              </p>

              <span className="shrink-0 text-xs text-purple-300">
                {new Date(todo.dueDate).toLocaleDateString("en-IN")}
              </span>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setActiveSection("My Tasks")}
        className="mt-4 w-full cursor-pointer rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
      >
        View My Tasks
      </button>
    </section>
  );
}

export default UpcomingDeadlines;
