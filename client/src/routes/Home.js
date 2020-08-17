import React, { useEffect, useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('api/v1/restaurants/9/dishes')
      if (response.status === 401) {
        setIsAuthenticated(false);
      }
      const data = await response.json();
      console.log(data);
    }
    fetchData();
  }, [])

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home;
