
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Try again.");
        return;
      }

      // Save login information
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Open Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Server se connection nahi ho paya. Backend check karo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B1020] px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#11182B] p-8 shadow-2xl shadow-indigo-950/30">

        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold">
            <span className="text-indigo-400">T</span>askFlow
          </h1>

          <h2 className="mt-6 text-2xl font-bold">
            Welcome Back!
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Login to continue your productivity journey.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="w-full rounded-xl border border-white/10 bg-[#0B1020] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/10 bg-[#0B1020] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Error message */}
          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="cursor-pointer font-semibold text-indigo-400 hover:text-indigo-300 "
          >
            Create Account
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;
