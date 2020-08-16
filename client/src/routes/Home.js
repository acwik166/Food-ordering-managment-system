import React, { useEffect } from 'react';

const Home = () => {

  useEffect(() => {
    fetch('api/v1/restaurants/9/dishes')
    .then((result) => result.json())
    .then((json) => console.log(json));
  }, [])

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home;
