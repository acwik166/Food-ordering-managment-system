import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <header>
      <h1>Foodable</h1>
      <nav>
        { isAuthenticated ? 
        <> 
          <li><Link to="/">Home</Link></li>
          <li><Link to="/logout">Logout</Link></li> :
        </> :
        <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Register</Link></li>
        </>
        }
      </nav>
    </header>
  )
}

export default Header;
