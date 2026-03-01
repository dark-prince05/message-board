import { useState, useEffect, useRef } from "react";

export const Topbar = ({ isLoggedIn, whoAmI, fetchMessages }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useRef(null);

  const handleOpen = () => {
    document.body.style.overflow = "hidden";
    dialogRef.current.showModal();
  };

  const handleClose = () => {
    document.body.style.overflow = "";
    dialogRef.current.close();
  };

  useEffect(() => {
    const dialog = dialogRef.current;

    const handleClose = () => {
      document.body.style.overflow = "";
    };

    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = { msgTitle: title, message };
    try {
      const res = await fetch("http://localhost:8000/message/create", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
        method: "POST",
      });

      const data = await res.json();
      if (res.status === 201) {
        handleClose();
        fetchMessages();
      } else {
        setInfoMsg(data.message);
      }
    } catch (e) {
      console.log("Error creating message");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: "include",
      });
      whoAmI();
    } catch (err) {
      console.log("Error in logout", err);
    }
  };
  return (
    <>
      <nav className="flex justify-between items-center px-6 py-3 bg-white/10 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <h1 className="font-bold text-xl text-slate-800 tracking-tight">
          Message Board
        </h1>
        <div className="flex gap-6 text-md items-center">
          <a
            href="/posts"
            className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            Posts
          </a>
          {isLoggedIn ? (
            <div
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors cursor-pointer"
              onClick={handleOpen}
            >
              New post
            </div>
          ) : (
            <a
              href="/login"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors cursor-pointer"
            >
              Login
            </a>
          )}
          {isLoggedIn ? (
            <div className="text-blue-600 hover:text-blue-700 font-semibold transition-colors cursor-pointer">
              Membership
            </div>
          ) : (
            <a
              href="/sign-up"
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors cursor-pointer"
            >
              Sign up
            </a>
          )}
          {isLoggedIn && (
            <div className="hover:text-blue-700 font-semibold transition-colors cursor-pointer" onClick={handleLogout}>
              Logout
            </div>
          )}
        </div>
      </nav>
      <dialog
        ref={dialogRef}
        className="fixed inset-0 m-auto rounded-lg p-6 bg-white shadow-xl backdrop-blur-2xl min-w-xl"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 h-[350px] flex flex-col justify-between"
        >
          <h1 className="font-bold text-2xl">Create Post</h1>
          {infoMsg && <span className="text-red-500">{infoMsg}</span>}
          {isLoading ? (
            <div className="flex justify-center w">
              <div class="h-8 w-8 animate-spin rounded-full border-5 border-slate-300 border-t-blue-500"></div>
            </div>
          ) : (
            <div>
              <div className="space-y-1.5 relative">
                <label className="text-xs font-semibold text-slate-700 ml-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setInfoMsg("");
                  }}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  placeholder="Title"
                />
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-xs font-semibold text-slate-700 ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setInfoMsg("");
                  }}
                  className="w-full min-h-[100px] resize-y py-2 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  placeholder="Enter you message"
                ></textarea>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              className="w-full btn-primary py-2.5 rounded-lg font-bold text-sm mt-4"
            >
              Post
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="w-full btn-secondary py-2.5 rounded-lg font-bold text-sm mt-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};
