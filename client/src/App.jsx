import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Mainpage } from "./components/Mainpage";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Topbar } from "./components/Topbar";
import { Posts } from "./components/Posts";
import { Membership } from "./components/Membership";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [allMessages, setAllMessages] = useState([]);
  const navigate = useNavigate();

  const whoAmI = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
      method: "GET",
      credentials: "include",
    });

    const details = await res.json();
    if (details?.authenticated === true) {
      setUserDetails(details);
      setIsLoggedIn(true);
      navigate('/posts')
    } else {
      setUserDetails({});
      setIsLoggedIn(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/message/all`, {
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
        <Route path="/sign-up" element={<Signup whoAmI={whoAmI} />} />
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
        <Route path="/membership" element={<Membership />} />
      </Routes>
    </>
  );
}

export default App;
