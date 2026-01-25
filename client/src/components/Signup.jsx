import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailExistError, setEmailExistError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const details = { firstName, lastName, email, password, confirmPassword, isMember: true };
    try {
      const response = await fetch("http://localhost:8000/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
        credentials: "include",
      });

      const data = await response.json();
      if(response.ok) {
        console.log('data sent successfully')
        navigate('/login');
      } else if (response.status === 409){
        setEmailExistError(data.message)
      } else if (response.status === 422){
        setPasswordError(data.message)
      }
    } catch (e) {
      console.log("Error sending details");
    }
  };

  return (
    <div className="flex flex-col min-h-[90dvh] bg-slate-50">
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 ml-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstname"
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="relative space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 ml-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailExistError("");
                }}
                required
              />
              {emailExistError && <span className="text-red-500 text-sm absolute left-2 -bottom-4 transition-all">{emailExistError}</span>}
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-xs font-semibold text-slate-700 ml-1">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => {
                  setPasswordError("")
                  setPassword(e.target.value)
                }}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                placeholder="••••••••"
                required
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
              {passwordError && <span className="text-red-500 text-sm absolute left-2 -bottom-4">{passwordError}</span>}
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-xs font-semibold text-slate-700 ml-1">
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="c-password"
                value={confirmPassword}
                onChange={(e) => {
                  setPasswordError("")
                  setConfirmPassword(e.target.value)
                }}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                placeholder="••••••••"
                required
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
                className="text-blue-600 font-semibold hover:cursor-pointer"
                onClick={() => navigate('/login')}
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
