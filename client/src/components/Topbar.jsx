import { useEffect, useState } from "react";

export const Topbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const whoAmI = async () => {
    const res = await fetch(`http://localhost:8000/me`, {
      method: "GET",
      credentials: "include",
    });

    const details = await res.json();
    console.log(details)
    if (details?.userId) setIsLoggedIn(true);
  };

  useEffect(() => {
    whoAmI();
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white/10 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <h1 className="font-bold text-xl text-slate-800 tracking-tight">
        Message Board
      </h1>
      <div className="flex gap-6 text-md">
        <a
          href="/posts"
          className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
        >
          Posts
        </a>
        {isLoggedIn ? (
          <div className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
            New post
          </div>
        ) : (
          <a
            href="/login"
            className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            Login
          </a>
        )}
        {isLoggedIn ? (
          <div className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
            Membership
          </div>
        ) : (
          <a
            href="/sign-up"
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            Sign up
          </a>
        )}
      </div>
    </nav>
  );
};
