
import { useState } from "react";

function CategoriesTags() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([
    { id: 1, name: "Study" },
    { id: 2, name: "Work" },
    { id: 3, name: "Personal" },
    { id: 4, name: "Urgent" },
  ]);

  const addCategory = (e) => {
    e.preventDefault();

    const name = categoryName.trim();

    if (!name) return;

    const alreadyExists = categories.some(
      (category) =>
        category.name.toLowerCase() === name.toLowerCase()
    );

    if (alreadyExists) {
      alert("Ye category pehle se hai!");
      return;
    }

    setCategories((prev) => [
      ...prev,
      { id: Date.now(), name },
    ]);

    setCategoryName("");
  };

  const deleteCategory = (id) => {
    setCategories((prev) =>
      prev.filter((category) => category.id !== id)
    );
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7">
      {/* Header */}
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
          Organize your work
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Categories & Tags
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Keep your tasks organized in one place.
        </p>
      </section>

      {/* Create Category */}
      <section className="rounded-2xl border border-indigo-400/20 bg-[#11182B] p-5 sm:p-7">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-white">
            Create a Category
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Add a category for your tasks.
          </p>
        </div>

        <form
          onSubmit={addCategory}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name..."
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0B1020] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10"
          />

          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.98]"
          >
            + Add Category
          </button>
        </form>
      </section>

      {/* Categories List */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white">
              Your Categories
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Manage your task categories.
            </p>
          </div>

          <span className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
            {categories.length} categories
          </span>
        </div>

        {categories.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-medium text-white">
              No categories yet
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Create your first category above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group rounded-2xl border border-white/10 bg-[#11182B] p-5 transition duration-200 hover:-translate-y-1 hover:border-indigo-400/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-xl text-indigo-300">
                    {["▤", "▣", "♡", "⚡"][index % 4]}
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteCategory(category.id)}
                    aria-label={`Delete ${category.name}`}
                    title="Delete category"
                    className="cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    ✕
                  </button>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-white">
                  {category.name}
                </h3>

                <p className="mt-1 text-sm text-indigo-300">
                  #{category.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}
                </p>

                <div className="mt-4 border-t border-white/[0.08] pt-3">
                  <p className="text-xs text-gray-500">
                    Category created
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default CategoriesTags;
