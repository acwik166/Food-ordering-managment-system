import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

const Logout = (props) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [isLoggedOut, setIsLoggedOut] = useState();

  useEffect(() => {
    const logout = async () => {
      const response = await fetch('api/v1/users/logout');
      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(false);
        setIsLoggedOut(true);
      } else {
        setIsAuthenticated(true);
        setIsLoggedOut(false);
      }
    }
    logout();
  }, [])

  return (
    <div>
      { isLoggedOut ? 
        <div> 
          <h1>Logged out</h1> :
          <button onClick={() => props.history.push('/login')}>Go to Login</button>
        </div> :
        <h1>You can't logout if you're not logged in</h1> 
      }
    </div>
  )
}

export default Logout;
