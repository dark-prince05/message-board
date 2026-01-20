import { useState } from "react";
import { Topbar } from "./Topbar";
import { Eye, EyeOff } from "lucide-react";

export const Signup = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Topbar />
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              Create Account
            </h2>
            <p className="text-slate-500 text-sm">
              Fill in your details to get started
            </p>
          </div>

          <form action="POST" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 ml-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  placeholder="John"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 ml-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-xs font-semibold text-slate-700 ml-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                placeholder="••••••••"
              />
              {!showPassword ? (
                <Eye
                  className="absolute top-1/2 right-3"
                  size={20}
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <EyeOff
                  className="absolute top-1/2 right-3"
                  size={20}
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-xs font-semibold text-slate-700 ml-1">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="c-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                placeholder="••••••••"
              />
              {!showConfirmPassword ? (
                <Eye
                  className="absolute top-1/2 right-3"
                  size={20}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                />
              ) : (
                <EyeOff
                  className="absolute top-1/2 right-3"
                  size={20}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-2.5 rounded-lg font-bold text-sm mt-4"
            >
              Sign Up
            </button>
            <p className="text-center text-xs text-slate-500 mt-4">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
