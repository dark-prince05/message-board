import { Route, Routes } from "react-router-dom";
import { Mainpage } from "./components/Mainpage";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
