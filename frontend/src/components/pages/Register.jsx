
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Account created successfully! Redirecting to login...");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(
        err.message || "Server se connection nahi ho paya."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B1020] px-4 py-6 text-white sm:py-8">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#11182B] p-5 shadow-2xl shadow-indigo-950/30 sm:p-8">

        {/* Logo and Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-extrabold">
            <span className="text-indigo-400">T</span>askFlow
          </h1>

          <h2 className="mt-6 text-2xl font-bold">
            Create Account
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Start organizing your day with TaskFlow.
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-4">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              autoComplete="name"
              maxLength={80}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0B1020] px-4 py-3 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-white/10 bg-[#0B1020] px-4 py-3 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
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
              placeholder="Create a password"
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0B1020] px-4 py-3 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
            />

            <p className="mt-1 text-xs text-gray-500">
              Use at least 8 characters.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter password again"
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0B1020] px-4 py-3 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
            >
              {error}
            </p>
          )}

          {/* Success Message */}
          {success && (
            <p
              role="status"
              className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400"
            >
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {/* Login Navigation */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="cursor-pointer font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign In
          </button>
        </p>

      </div>
    </div>
  );
}

export default Register;
