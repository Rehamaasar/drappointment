import { useState } from "react";
import { HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [toast, setToast] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  function showToast(message, error = false) {
    setToast(message);
    setIsError(error);
    setTimeout(() => setToast(""), 3000);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      return showToast("Please enter email and password.", true);
    }

    setLoading(true);

    try {
      // ✅ CORRECT backend route
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      // ✅ SAVE TOKEN + USER
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      showToast(data.message || "Login successful! Welcome back 👋", false);

      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      showToast(err?.message || "Invalid email or password.", true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-12 sm:py-16 bg-[#f5f7ff] min-h-screen">
      <div className="max-w-md mx-auto px-4 sm:px-0">
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 rounded-3xl bg-gradient-to-tr from-[#ff5ea8] to-[#7d5bff] flex items-center justify-center shadow-sm">
            <HeartPulse className="h-7 w-7 text-white" />
          </div>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white/95 rounded-3xl shadow-sm px-6 py-7 sm:px-8 sm:py-8">
          <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-600 text-center mb-6">
            Sign in to access your account
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* EMAIL FIELD */}
            <div>
              <label className="text-xs font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-[#f3f4ff]/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#6366f1]"
                placeholder="john@example.com"
              />
            </div>

            {/* PASSWORD FIELD */}
            <div>
              <label className="text-xs font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-[#f3f4ff]/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#6366f1]"
                placeholder="••••••••"
              />
            </div>

            {/* SIGN IN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#6366f1] text-white text-sm font-medium py-2.5 hover:bg-[#4f46e5] transition active:scale-95 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* SIGN UP LINK */}
          <p className="text-xs text-slate-600 text-center mt-4">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-[#6366f1] font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 max-w-xs rounded-2xl bg-white shadow-lg border px-4 py-3 text-sm ${
            isError ? "border-red-200" : "border-slate-100"
          }`}
        >
          <p
            className={`font-semibold mb-1 ${
              isError ? "text-red-600" : "text-slate-900"
            }`}
          >
            {isError ? "Login Failed" : "Login Successful!"}
          </p>
          <p className="text-slate-600">{toast}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
