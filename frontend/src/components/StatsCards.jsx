
function StatsCards({ total, completed, pending }) {
  const stats = [
    {
      title: "Total Tasks",
      value: total,
      style: "border-white/10 bg-[#151D31]",
      color: "text-white",
    },
    {
      title: "Completed",
      value: completed,
      style: "border-emerald-400/10 bg-[#122820]",
      color: "text-emerald-400",
    },
    {
      title: "Pending",
      value: pending,
      style: "border-purple-400/10 bg-[#211A38]",
      color: "text-purple-300",
    },
  ];

  return (
    <section className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`rounded-2xl border p-4 sm:p-5 ${stat.style}`}
        >
          <p className="text-sm text-gray-400">{stat.title}</p>
          <p className={`mt-2 text-2xl font-bold ${stat.color}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </section>
  );
}

export default StatsCards;
