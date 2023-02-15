import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Messanger from "./pages/messager/Messanger";

// const Home = React.lazy(() => {
//   import("./pages/home/Home");
// });
// const Login = React.lazy(() => {
//   import("./pages/login/Login");
// });
// const Register = React.lazy(() => {
//   import("./pages/register/Register");
// });
// const Profile = React.lazy(() => {
//   import("./pages/profile/Profile");
// });
// const Messanger = React.lazy(() => {
//   import("./pages/messager/Messanger");
// });

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/messanger" element={<Messanger />} />
        <Route exact path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={ <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </Router>
  );
}
