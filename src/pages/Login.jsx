import { useState } from "react";
import { HeartPulse } from "lucide-react";

function Login() {
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSubmit(e) {
    // If the email is invalid, the browser will block submit
    // and this function will NOT run. So we only show success
    // when the form is valid.
    e.preventDefault();
    setShowSuccess(true);

    // hide toast after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
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
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-[#f3f4ff]/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#6366f1]"
                placeholder="••••••••"
              />
            </div>

            {/* REMEMBER + FORGOT */}
            <div className="flex items-center justify-between text-xs text-slate-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-slate-300" />
                <span>Remember me</span>
              </label>

              <button type="button" className="text-[#6366f1] hover:underline">
                Forgot password?
              </button>
            </div>

            {/* SIGN IN BUTTON */}
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#6366f1] text-white text-sm font-medium py-2.5 hover:bg-[#4f46e5] transition active:scale-95"
            >
              Sign In
            </button>
          </form>

          {/* SIGN UP LINK */}
          <p className="text-xs text-slate-600 text-center mt-4">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="text-[#6366f1] font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>

      {/* SUCCESS TOAST */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 max-w-xs rounded-2xl bg-white shadow-lg border border-slate-100 px-4 py-3 text-sm">
          <p className="font-semibold text-slate-900 mb-1">Login Successful!</p>
          <p className="text-slate-600">Welcome back to HealthCare+</p>
        </div>
      )}
    </div>
  );
}

export default Login;
