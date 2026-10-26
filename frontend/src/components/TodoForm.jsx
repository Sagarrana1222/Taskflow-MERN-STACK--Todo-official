
function TodoForm({ task, setTask, dueDate, setDueDate, addTodo }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!task.trim()) return;
    addTodo();
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-indigo-400/20 bg-[#11182B]/90 shadow-lg shadow-indigo-950/10">
      <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-5 sm:px-7">
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
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7">
        <div className="space-y-2">
          <label htmlFor="task-title" className="block text-sm font-medium text-gray-300">
            Task title
          </label>

          <input
            id="task-title"
            type="text"
            placeholder="What do you need to do?"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0B1020] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-500 hover:border-white/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0 space-y-2">
            <label htmlFor="task-due-date" className="block text-sm font-medium text-gray-300">
              Due date <span className="font-normal text-gray-500">(optional)</span>
            </label>

            <input
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="w-full min-w-0 cursor-pointer rounded-xl border border-white/10 bg-[#0B1020] px-4 py-3.5 text-sm text-gray-200 outline-none transition hover:border-white/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 [color-scheme:dark]"
            />

            <p className="text-xs text-gray-500">
              Choose a deadline for your task.
            </p>
          </div>

          <button
            type="submit"
            disabled={!task.trim()}
            className="inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <span className="text-xl leading-none">+</span>
            Add Task
          </button>
        </div>
      </form>
    </section>
  );
}

export default TodoForm;
