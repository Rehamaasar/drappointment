// src/pages/SignUp.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validations
    if (!form.full_name.trim()) return showToast("Please enter your full name.");
    if (!form.email.trim()) return showToast("Please enter your email.");
    if (!validateEmail(form.email)) return showToast("Please enter a valid email.");
    if (!form.password) return showToast("Please enter a password.");
    if (form.password.length < 6)
      return showToast("Password must be at least 6 characters.");
    if (form.password !== form.confirmPassword)
      return showToast("Passwords do not match.");

    setLoading(true);

    try {
      // ✅ CORRECT backend call
      const data = await apiRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      // ✅ SAVE AUTH DATA
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      showToast(data.message || "Account created successfully ✅");

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      showToast(err?.message || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">❤</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10">
          <h1 className="text-3xl font-extrabold text-center text-slate-900">
            Create Account
          </h1>
          <p className="text-center text-slate-500 mt-2">
            Sign up to access your account
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={form.full_name}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold py-3"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 font-semibold">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {toast && (
          <div className="fixed bottom-6 right-6 bg-white shadow-xl rounded-2xl px-6 py-4 border">
            <p className="text-sm">{toast}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
