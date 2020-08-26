import React, { useRef, useState, useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { login } from "../auth/userAuth";

const Login = (props) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(
      emailRef.current.value,
      passwordRef.current.value
    );
    if (response.success) {
      setIsAuthenticated(true);
      props.history.push("/");
    } else {
      switch (response.message) {
        case "Invalid email":
          setEmailError("Invalid email");
          emailRef.current.focus();
          break;
        case "Invalid password":
          setPasswordError("Invalid password");
          passwordRef.current.focus();
          break;
        default:
          console.log("Error");
      }
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div>
          <h1>You are already logged in</h1>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" ref={emailRef} />
            {emailError ? <span>{emailError}</span> : null}
            <label htmlFor="password">Password</label>
            <input type="password" name="password" ref={passwordRef} />
            {passwordError ? <span>{passwordError}</span> : null}
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
