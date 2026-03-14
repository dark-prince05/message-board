import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Membership = () => {
  const [answer, setAnswer] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { answer };
      const res = await fetch(`${import.meta.env.VITE_API_URL}/membership`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const data = await res.json();
      console.log(data, "hi");
      if (data.message != "Wrong answer") {
        navigate("/posts");
      } else {
        setMsg(data.message);
      }
    } catch (e) {
      console.log("Error giving membership");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Membership</h1>
          <p className="text-slate-600 text-sm">
            Answer the question below to apply for membership
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            <p className="text-slate-700 font-medium mb-4">
              Please answer this question:
            </p>
            <p className="text-xl font-bold text-slate-900 bg-slate-100 rounded-xl p-4 border border-slate-200">
              (5 + 3) × 2 - 6 ÷ 3 = ?
            </p>
            {msg && <div className="text-sm text-red-500 mt-2">{msg}</div> }

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="answer"
                  className="text-xs font-semibold text-slate-700 ml-1 block"
                >
                  Your answer
                </label>
                <input
                  id="answer"
                  type="number"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  placeholder="Enter the result"
                />
              </div>
              <button
                type="submit"
                className="w-full btn-primary py-2.5 rounded-lg font-bold text-sm mt-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
