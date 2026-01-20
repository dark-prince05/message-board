import { Topbar } from "./Topbar";

export const Mainpage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Welcome to Message Board
            </h2>
            <img
              src="/message-board.png"
              className="w-32 h-32 mx-auto animate-floating object-contain"
              alt="Message Board"
            />
          </div>
          <p className="text-slate-600 mb-8 leading-relaxed">
            A simple, modern space to share your thoughts and connect with others.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/sign-up"
              className="btn-primary flex-1 py-2.5 rounded-lg font-semibold text-center"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="btn-secondary flex-1 py-2.5 rounded-lg font-semibold text-center"
            >
              Login
            </a>
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-slate-500 text-xs">
        &copy; 2024 Message Board. Simple. Clean. Solid.
      </footer>
    </div>
  );
};
