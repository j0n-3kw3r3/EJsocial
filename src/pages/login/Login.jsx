import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls/apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const {  isFetching,  dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
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
              type="email"
              placeholder="Email"
              required
              className="input"
              ref={email}
            />
            <input
              type="password"
              placeholder="password"
              required
              minLength="6"
              className="input"
              ref={password}
            />
            <button className="button" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress
                  style={{ color: "white", height: "20px", width: "20px" }}
                />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password</span>
            <Link to="/register" className="loginButton">
              
              {isFetching ? (
                <CircularProgress
                  style={{ color: "white", height: "20px", width: "20px" }}
                />
              ) : (
                " Create a New Account"
              )}
            </Link>
           
          </form>
        </div>
      </div>
    </div>
  );
}
