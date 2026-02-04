import { useEffect, useState, useRef } from "react";
import { Clock, Pencil, Trash2 } from "lucide-react";

export const Posts = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [messageId, setMessageId] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:8000/message/all", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        console.log("Failed to fetch messages");
      }

      const messages = await response.json();
      setAllMessages(messages.msgs);
    } catch (e) {
      console.log(e, "Error retreiving messages");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const whoAmI = async () => {
      try {
        const res = await fetch("http://localhost:8000/me", {
          method: "GET",
          credentials: "include",
        });

        const details = await res.json();
        setUserDetails(details);
      } catch (e) {
        console.log(e.message);
      }
    };
    whoAmI();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const payload = { title, message };
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/message/update/${messageId}`,
        {
          headers: { "Content-Type": "application/json" },
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );

      if (res.ok) {
        dialogRef.current.close();
        fetchMessages();
      } else {
        setInfoMsg("Error updating message");
      }
    } catch (e) {
      console.log("Error updating message");
      setInfoMsg("Error updating message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (msgId) => {
    const confirmed = confirm("do you really want to delete this message")
    if(!confirmed) return;
    try {
      const res = await fetch(`http://localhost:8000/message/delete/${msgId}`,{
        method: "DELETE",
        credentials: "include"
      })
      if(res.status === 204){
        alert("Message deleted successfully")
        setAllMessages((prev) => {
          return prev.filter((msg) => msg.msg_id !== msgId)
        })
      } else {
        alert("Message deleted successfully")
      }

    } catch (e) {
      console.log("Error deleting message");
    }
  };

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

  const pickRandomColor = (index) => {
    const colors = [
      "bg-green-500",
      "bg-sky-500",
      "bg-red-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-amber-500",
      "bg-neutral-500",
      "bg-blue-500",
      "bg-pink-500",
      "bg-yellow-500",
      "bg-lime-500",
      "bg-emerald-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-cyan-500",
      "bg-violet-500",
      "bg-fuchsia-500",
      "bg-rose-500",
      "bg-slate-500",
      "bg-gray-500",
      "bg-zinc-500",
      "bg-stone-500",
    ];
    return colors[index];
  };

  const formatTimeAndData = (datetime) => {
    const result = new Date(datetime).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return result;
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">All Posts</h1>
            <p className="text-slate-600 text-sm">
              Share your thoughts and connect with others
            </p>
          </div>

          {allMessages.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-slate-400 text-lg">
                No messages yet. Be the first to post!
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {allMessages.map((details, ind) => {
                const roleBadgeColor = details.is_admin
                  ? "bg-purple-500"
                  : details.is_member
                    ? "bg-blue-500"
                    : "bg-slate-500";

                return (
                  <div
                    key={details.msg_id}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100"
                  >
                    <div className="p-6 pb-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`${pickRandomColor(ind % 22)} text-white text-xl font-bold rounded-full w-14 h-14 flex items-center justify-center shadow-lg ring-2 ring-white transition-transform `}
                        >
                          {userDetails.role == "admin" ||
                          userDetails.role == "member"
                            ? details.first_name.slice(0, 1).toUpperCase()
                            : "A"}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <h3 className="font-bold text-lg text-slate-800 truncate">
                                {userDetails.role == "admin" ||
                                userDetails.role == "member"
                                  ? details.first_name + " " + details.last_name
                                  : "Anonymous"}
                              </h3>
                              <p className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatTimeAndData(details.created_at)}
                              </p>
                            </div>
                            <div>
                              <div className="flex gap-2 justify-end mb-1">
                                {userDetails.userId === details.user_id && (
                                  <Pencil
                                    className="hover:text-blue-600 hover:cursor-pointer"
                                    onClick={() => {
                                      setTitle(details.msg_title);
                                      setMessage(details.message);
                                      setMessageId(details.msg_id);
                                      handleOpen();
                                    }}
                                  />
                                )}
                                {userDetails.userId === details.user_id && (
                                  <Trash2 onClick={() => handleDelete(details.msg_id)} className="hover:text-blue-600 hover:cursor-pointer" />
                                )}
                              </div>
                              <span
                                className={`${roleBadgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm whitespace-nowrap`}
                              >
                                {details.is_admin
                                  ? "Admin"
                                  : details.is_member
                                    ? "Member"
                                    : "Guest"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 pb-4">
                      <div className="bg-slate-100 rounded-xl p-3 border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2">
                          {details.msg_title}
                        </h2>
                        <div className="h-px bg-slate-300 mb-4"></div>
                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                          {details.message}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <dialog
          ref={dialogRef}
          className="fixed inset-0 m-auto rounded-lg p-6 bg-white shadow-xl backdrop-blur-2xl min-w-xl"
        >
          <form
            onSubmit={handleUpdate}
            className="space-y-4 h-[350px] flex flex-col justify-between"
          >
            <h1 className="font-bold text-2xl">Edit Post</h1>
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
                Update
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
      </div>
    </>
  );
};
