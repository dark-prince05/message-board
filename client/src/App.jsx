import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Mainpage } from "./components/Mainpage";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Topbar } from "./components/Topbar";
import { Posts } from "./components/Posts";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [allMessages, setAllMessages] = useState([]);

  const whoAmI = async () => {
    const res = await fetch(`http://localhost:8000/me`, {
      method: "GET",
      credentials: "include",
    });

    const details = await res.json();
    if (details?.authenticated === true) {
      setUserDetails(details);
      setIsLoggedIn(true);
    } else {
      setUserDetails({});
      setIsLoggedIn(false);
    }
  };

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
    whoAmI();
  }, []);

  return (
    <>
      <Topbar
        isLoggedIn={isLoggedIn}
        whoAmI={whoAmI}
        fetchMessages={fetchMessages}
      />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/posts"
          element={
            <Posts
              userDetails={userDetails}
              whoAmI={whoAmI}
              allMessages={allMessages}
              setAllMessages={setAllMessages}
              fetchMessages={fetchMessages}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
