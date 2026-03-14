import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });
      const data = await response.json();

      if (response.ok) {
        navigate("/posts");
      } else {
        setErrorMsg(data.message);
      }
    } catch (e) {
      console.log("Error sending details");
      setErrorMsg(e);
    }
  };

  return (
    <div className="flex flex-col min-h-[90dvh] bg-slate-50">
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4"></div>
            <div className="space-y-1.5 relative">
              <label className="text-xs font-semibold text-slate-700 ml-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="email"
                className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errorMsg && <span className="text-red-500 text-sm absolute left-2 -bottom-4 transition-all">{errorMsg}</span>}
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-xs font-semibold text-slate-700 ml-1">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                placeholder="••••••••"
                required
              />
              {!showPassword ? (
                <Eye
                  className="absolute top-1/2 right-3 cursor-pointer"
                  size={20}
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <EyeOff
                  className="absolute top-1/2 right-3 cursor-pointer"
                  size={20}
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </div>
            <button
              type="submit"
              className="w-full btn-primary py-2.5 rounded-lg font-bold text-sm mt-4"
            >
              Log in
            </button>
            <p className="text-center text-xs text-slate-500 mt-4">
              Don't have an account?{" "}
              <a
                onClick={() => navigate("/sign-up")}
                className="text-blue-600 font-semibold hover:cursor-pointer"
              >
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
