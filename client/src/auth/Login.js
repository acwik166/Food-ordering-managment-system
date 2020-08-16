import React, { useRef, useState, useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('api/v1/users/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email: emailRef.current.value, password: passwordRef.current.value})
    })
    .then((result) => result.json())
    .then((json) => {
      if (json.success === true) {
        console.log('eq')
      } else {
        switch (json.message) {
          case 'Invalid email':
            setEmailError('Invalid email');
            emailRef.current.focus();
            break;
          case 'Invalid password':
            setPasswordError('Invalid password');
            passwordRef.current.focus();
            break;
          default:
              console.log(`Error`);
        }
      }
    })
  }

  return (
    <>
      { isAuthenticated ? 
        <div>
          <h1>You are already logged in</h1>
        </div> : 
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" ref={emailRef}/>
            { emailError ? <span>{ emailError }</span> : null}
            <label htmlFor="password">Password</label>
            <input type="password" name="password" ref={passwordRef}/>
            { passwordError ? <span>{ passwordError }</span> : null}
            <button>Login</button>
          </form>
        </div>
      }
    </>
  )
}

export default Login;
