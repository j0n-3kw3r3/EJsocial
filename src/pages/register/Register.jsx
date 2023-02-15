import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function Register() {
  const email = useRef();
  const username = useRef();
  const password1 = useRef();
  const password2 = useRef();

      const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password1.current.value === password2.current.value) {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password1.current.value,
      };
      try {
        const save = async () => {
              await axios.post("/auth/registration", user);
              navigate("/login");
        };
        save();
      } catch (error) {
        console.log(error);
      }
    } else {
      password2.current.setCustomValidity("passwords don't match");
    }
  };
  return (
    <div className="login">
      <div className="wrapper">
        <div className="left">
          <h3 className="loginLogo">EJSocial</h3>
          <span className="desc">
            Connect with friends and the world around you on EJSocial
          </span>
        </div>
        <div className="right">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="input"
              required
              ref={username}
            />
            <input
              type="email"
              placeholder="Email"
              className="input"
              required
              ref={email}
            />
            <input
              type="password"
              placeholder="password"
              className="input"
              required
              minLength={6}
              ref={password1}
            />
            <input
              type="password"
              placeholder="password Again"
              className="input"
              required
              ref={password2}
            />
            <button className="button" type="submit">
              Sign Up
            </button>
            <Link to='/login' className="loginButton">
              
              Log into Account</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
