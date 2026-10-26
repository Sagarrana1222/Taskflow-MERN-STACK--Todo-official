
import TaskChart from "./TaskChart";
import WeeklyChart from "./WeeklyChart";
import ProductivityChart from "./ProductivityChart";
import DailyProgress from "./DailyProgress";
import UpcomingDeadlines from "./UpcomingDeadlines";
import ProductivityScore from "./ProductivityScore";

function Dashboard({
  todos,
  completedCount,
  pendingCount,
  overdueCount,
  setActiveSection,
}) {
  return (
    <div>
      {/* Header */}
      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-purple-300">
          YOUR PRODUCTIVITY SPACE
        </p>

        <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Dashboard Overview
          </span>
        </h1>

        <p className="mt-3 text-sm text-gray-400 sm:text-base">
          Track your tasks, monitor progress, and stay productive.
        </p>
      </header>

      {/* Statistics Cards */}
      <section className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 sm:gap-4">
        {/* Total Tasks */}
        <div className="rounded-2xl border border-white/10 bg-[#151D31] p-4 sm:p-5">
          <p className="text-sm text-gray-400">Total Tasks</p>
          <p className="mt-2 text-2xl font-bold text-white">
            {todos.length}
          </p>
        </div>

        {/* Completed */}
        <div className="rounded-2xl border border-emerald-400/10 bg-[#122820] p-4 sm:p-5">
          <p className="text-sm text-gray-400">Completed</p>
          <p className="mt-2 text-2xl font-bold text-emerald-400">
            {completedCount}
          </p>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-purple-400/10 bg-[#211A38] p-4 sm:p-5">
          <p className="text-sm text-gray-400">Pending</p>
          <p className="mt-2 text-2xl font-bold text-purple-300">
            {pendingCount}
          </p>
        </div>

        {/* Overdue */}
        <div className="rounded-2xl border border-red-400/10 bg-[#301B27] p-4 sm:p-5">
          <p className="text-sm text-gray-400">Overdue Tasks</p>
          <p className="mt-2 text-2xl font-bold text-red-400">
            {overdueCount}
          </p>
        </div>
      </section>

      {/* Analytics Charts */}
      <section className="mb-8 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <TaskChart
          completedCount={completedCount}
          pendingCount={pendingCount}
        />

        <WeeklyChart todos={todos} />

        <ProductivityChart todos={todos} />
      </section>

      {/* Productivity Score + Daily Progress */}
      <section className="mb-8 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ProductivityScore todos={todos} />

        <DailyProgress todos={todos} />
      </section>

      {/* Upcoming Deadlines */}
      <section className="mb-8">
        <UpcomingDeadlines
          todos={todos}
          setActiveSection={setActiveSection}
        />
      </section>
    </div>
  );
}

export default Dashboard;

// http://localhost:5173/dashboard
