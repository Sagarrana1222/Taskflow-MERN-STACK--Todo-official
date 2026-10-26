
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Sidebar";
import Dashboard from "../Dashboard";
import MyTasks from "../MyTasks";
import CategoriesTags from "../CategoriesTags";

function TaskFlow() {
  const navigate = useNavigate();

  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [todos, setTodos] = useState([]);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem("token");

  // Logout
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  // Fetch logged-in user's tasks
  useEffect(() => {
    const fetchTodos = async () => {
      const token = getToken();

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/todos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          handleLogout();
          return;
        }

        if (!response.ok) {
          throw new Error("Tasks fetch nahi hue");
        }

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [navigate]);

  // Add task
  const addTodo = async () => {
    if (!task.trim()) return;

    const token = getToken();

    if (!token) {
      handleLogout();
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: task.trim(),
            dueDate: dueDate || null,
          }),
        }
      );

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        throw new Error("Task add nahi hui");
      }

      const newTodo = await response.json();

      setTodos((previous) => [...previous, newTodo]);
      setTask("");
      setDueDate("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Complete or undo task
  const toggleTodo = async (todo) => {
    const token = getToken();

    if (!token) {
      handleLogout();
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/todos/${todo._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        throw new Error("Task update nahi hui");
      }

      const updatedTodo = await response.json();

      setTodos((previous) =>
        previous.map((item) =>
          item._id === updatedTodo._id ? updatedTodo : item
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const deleteTodo = async (id) => {
    const token = getToken();

    if (!token) {
      handleLogout();
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        throw new Error("Task delete nahi hui");
      }

      setTodos((previous) =>
        previous.filter((todo) => todo._id !== id)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Statistics
  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  const pendingCount = todos.length - completedCount;

  const overdueCount = todos.filter((todo) => {
    if (todo.completed || !todo.dueDate) return false;

    const due = new Date(todo.dueDate);
    due.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return due < today;
  }).length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B1020] px-4 text-white">
        <p className="text-gray-300">Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0B1020] text-white">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.18),transparent_55%)]"
      />

      {/* Responsive sidebar and logout */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
      />

      {/* Responsive main content */}
      <main className="relative z-10 ml-0 min-h-screen w-full min-w-0 px-4 pb-6 pt-20 sm:px-6 md:ml-60 md:w-auto md:px-6 md:pt-6 lg:p-8">
        <div className="mx-auto w-full min-w-0 max-w-7xl">
          {activeSection === "Dashboard" ? (
            <Dashboard
              todos={todos}
              completedCount={completedCount}
              pendingCount={pendingCount}
              overdueCount={overdueCount}
              setActiveSection={setActiveSection}
            />
          ) : activeSection === "My Tasks" ? (
            <MyTasks
              task={task}
              setTask={setTask}
              dueDate={dueDate}
              setDueDate={setDueDate}
              addTodo={addTodo}
              todos={todos}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ) : activeSection === "Categories & Tags" ? (
            <CategoriesTags />
          ) : (
            <div className="min-w-0">
              <h1 className="break-words text-2xl font-bold sm:text-3xl">
                {activeSection}
              </h1>
              <p className="mt-2 text-gray-400">
                Ye section hum baad mein banayenge.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default TaskFlow;
