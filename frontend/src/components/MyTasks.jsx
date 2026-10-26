
import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function MyTasks({
  task,
  setTask,
  dueDate,
  setDueDate,
  addTodo,
  todos,
  toggleTodo,
  deleteTodo,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  const pendingCount = todos.length - completedCount;

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = (todo.title || "")
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Pending" && !todo.completed) ||
      (filter === "Completed" && todo.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7">

      {/* Header */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
            Stay focused • Stay productive
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            My Tasks
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Organize your day and get things done.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start rounded-2xl border border-indigo-400/20 bg-indigo-500/10 px-5 py-3 sm:self-auto">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/20 text-xl text-indigo-300">
            ✓
          </div>

          <div>
            <p className="text-2xl font-bold text-white">
              {todos.length}
            </p>
            <p className="text-xs text-gray-400">Total Tasks</p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="All Tasks"
          count={todos.length}
          color="indigo"
          percentage={todos.length ? 100 : 0}
        />

        <StatCard
          title="Completed"
          count={completedCount}
          color="emerald"
          percentage={
            todos.length
              ? (completedCount / todos.length) * 100
              : 0
          }
        />

        <StatCard
          title="Pending"
          count={pendingCount}
          color="amber"
          percentage={
            todos.length
              ? (pendingCount / todos.length) * 100
              : 0
          }
        />
      </section>

      {/* Add Task */}
      <section className="overflow-hidden rounded-2xl border border-indigo-400/20 bg-[#11182B] shadow-lg shadow-indigo-950/20">
        {/* <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-5 sm:px-7">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-2xl text-indigo-300">
            +
          </div>

          <div>
             <h2 className="text-lg font-semibold text-white">
              Create a New Task
            </h2> 
            <p className="mt-1 text-sm text-gray-400">
              What's on your mind? Plan your next move.
            </p>
          </div>
        </div> */}

        <div className="p-4 sm:p-7">
          <TodoForm
            task={task}
            setTask={setTask}
            dueDate={dueDate}
            setDueDate={setDueDate}
            addTodo={addTodo}
          />
        </div>
      </section>

      {/* Task List */}
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
        <div className="border-b border-white/[0.08] px-5 py-5 sm:px-7">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-white">
                Search Your Task
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Every small step counts.
              </p>
            </div>

            <span className="w-fit rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-gray-300">
              {pendingCount} pending · {completedCount} completed
            </span>
          </div>

          {/* Search */}
          <div className="relative mt-5">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-500">
              ⌕
            </span>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your tasks..."
              aria-label="Search tasks"
              className="w-full rounded-xl border border-white/10 bg-[#11182B] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10"
            />
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {["All", "Pending", "Completed"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`cursor-pointer rounded-xl border px-4 py-2 text-sm font-medium transition ${
                  filter === item
                    ? "border-indigo-400 bg-indigo-500 text-white shadow-lg shadow-indigo-950/20"
                    : "border-white/10 bg-white/[0.04] text-gray-400 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {item}
                <span className="ml-2 opacity-80">
                  {item === "All"
                    ? todos.length
                    : item === "Pending"
                      ? pendingCount
                      : completedCount}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="p-3 sm:p-5">
          {todos.length === 0 ? (
            <EmptyState
              title="No tasks yet"
              message="Add your first task above and start making progress."
            />
          ) : filteredTodos.length === 0 ? (
            <EmptyState
              title="No matching tasks"
              message="Try another search term or select a different filter."
            />
          ) : (
            <TodoList
              todos={filteredTodos}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, count, color, percentage }) {
  const styles = {
    indigo: {
      border: "border-indigo-400/20",
      number: "text-indigo-300",
      bar: "bg-indigo-500",
    },
    emerald: {
      border: "border-emerald-400/20",
      number: "text-emerald-400",
      bar: "bg-emerald-400",
    },
    amber: {
      border: "border-amber-400/20",
      number: "text-amber-400",
      bar: "bg-amber-400",
    },
  };

  const style = styles[color];

  return (
    <div
      className={`rounded-2xl border ${style.border} bg-white/[0.04] p-5 transition duration-300 hover:bg-white/[0.06]`}
    >
      <p className="text-sm text-gray-400">{title}</p>

      <h2 className={`mt-3 text-3xl font-bold ${style.number}`}>
        {count}
      </h2>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${style.bar} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function EmptyState({ title, message }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-3xl text-indigo-300">
        ✓
      </div>

      <h3 className="text-lg font-semibold text-white">{title}</h3>

      <p className="mt-2 max-w-sm text-sm text-gray-400">
        {message}
      </p>
    </div>
  );
}

export default MyTasks;
