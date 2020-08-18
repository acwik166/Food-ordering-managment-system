import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <span className="navbar-brand mb-0 h1">Foodable</span>
        {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
          {/* { isAuthenticated ? 
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/restaurants">Restaurants</Link>
              </li>
              <li className="nav-item">
                <Link to="/logout">Logout</Link>
              </li> 
            </ul> :
            <ul>
              <li className="nav-item">
                <Link to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup">Register</Link>
              </li>
            </ul>
          } */}
        {/* </div> */}
      </nav>
    </header>
  )
}

export default Header;
