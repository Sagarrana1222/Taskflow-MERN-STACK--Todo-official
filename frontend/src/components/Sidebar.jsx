
import { useState } from "react";

const menuItems = [
  { name: "Dashboard", icon: "▦" },
  { name: "My Tasks", icon: "☷" },
  { name: "Categories & Tags", icon: "#" },
];

function Sidebar({ activeSection, setActiveSection, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#0B1020] px-4 text-white md:hidden">
        <h1 className="text-xl font-extrabold tracking-tight">
          <span className="text-indigo-400">T</span>askFlow
        </h1>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-2xl hover:bg-white/10"
        >
          {mobileMenuOpen ? "×" : "☰"}
        </button>
      </header>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col overflow-y-auto border-r border-white/10 bg-[#0B1020] text-white transition-transform duration-300 md:w-60 ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-6">
          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="text-indigo-400">T</span>askFlow
          </h1>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="rounded-lg px-2 py-1 text-2xl text-slate-400 hover:bg-white/10 hover:text-white md:hidden"
          >
            ×
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Workspace
          </p>

          {menuItems.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => handleNavigation(item.name)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                activeSection === item.name
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-950/30"
                  : "cursor-pointer text-slate-400 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <span className="flex h-6 w-6 items-center justify-center text-lg">
                {item.icon}
              </span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-white/10 p-5">
          <p className="text-sm font-semibold text-slate-300">
            TaskFlow
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Stay focused. Stay productive.
          </p>

          {/* Logout button */}
          <button
  type="button"
  onClick={onLogout}
  className="mt-5 flex w-full cursor-pointer items-center gap-3 rounded-xl border border-red-500/20 px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
>
  <span className="text-lg">↪</span>
  <span>Logout</span>
</button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
