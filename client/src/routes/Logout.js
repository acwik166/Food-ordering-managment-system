import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

const Logout = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    fetch('api/v1/users/logout')
      .then((result) => result.json())
      .then((json) => json.success ? setIsAuthenticated(false) : true)
  }, [])

  return (
    <div>
      { !isAuthenticated ? 
        <h1>Logged out</h1> :
        <h1>You are not logged in</h1> 
      }
    </div>
  )
}

export default Logout;
