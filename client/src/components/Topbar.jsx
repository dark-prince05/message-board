export const Topbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white border-b border-slate-200 sticky top-0 z-50">
      <h1 className="font-bold text-lg text-slate-800 tracking-tight">
        Message Board
      </h1>
      <div className="flex gap-6 text-sm">
        <a
          href="/posts"
          className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
        >
          Posts
        </a>
        <a
          href="/login"
          className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
        >
          Login
        </a>
        <a
          href="/sign-up"
          className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
        >
          Sign up
        </a>
      </div>
    </nav>
  );
};
