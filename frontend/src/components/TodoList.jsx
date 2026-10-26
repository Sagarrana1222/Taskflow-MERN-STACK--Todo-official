
function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Your Tasks
        </h2>

        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
          {todos.length} total
        </span>
      </div>

      {todos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-10 text-center">
          <p className="text-base font-medium text-gray-300">
            No tasks yet
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Add your first task above to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {todos.map((todo) => {
            const isOverdue =
              !todo.completed &&
              todo.dueDate &&
              new Date(todo.dueDate).getTime() <
                new Date(new Date().toDateString()).getTime();

            return (
              <div
                key={todo._id}
                className={`flex min-w-0 items-start gap-3 rounded-2xl border p-3 transition duration-200 sm:items-center sm:gap-4 sm:p-4 ${
                  isOverdue
                    ? "border-red-400/30 bg-red-500/5 hover:bg-red-500/10"
                    : "border-white/10 bg-[#151D31]/90 hover:border-purple-400/30 hover:bg-[#192239]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo)}
                  aria-label={`Mark ${todo.title} as ${
                    todo.completed ? "pending" : "completed"
                  }`}
                  className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-purple-500 sm:mt-0"
                />

                <div className="min-w-0 flex-1">
                  <p
                    className={`break-words text-sm font-medium sm:text-base ${
                      todo.completed
                        ? "text-gray-500 line-through"
                        : "text-gray-100"
                    }`}
                  >
                    {todo.title}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`text-xs ${
                        todo.completed
                          ? "text-emerald-400"
                          : "text-purple-300"
                      }`}
                    >
                      {todo.completed ? "Completed" : "In progress"}
                    </span>

                    {todo.dueDate && (
                      <span
                        className={`text-xs ${
                          isOverdue
                            ? "font-semibold text-red-400"
                            : "text-gray-400"
                        }`}
                      >
                        Deadline:{" "}
                        {new Date(todo.dueDate).toLocaleDateString("en-IN")}
                      </span>
                    )}

                    {isOverdue && (
                      <span className="rounded-full bg-red-500/15 px-2 py-1 text-xs font-semibold text-red-400">
                        Overdue
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => deleteTodo(todo._id)}
                  aria-label={`Delete ${todo.title}`}
                  className="shrink-0 cursor-pointer rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/20 hover:text-red-200 sm:px-4 sm:text-sm"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default TodoList;
