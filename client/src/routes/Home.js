import React, { useState } from 'react';

import '../styles/Home.css';

const Home = (props) => {
  const [city, setCity] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (city === '') {
      const newObj = {...errors, city: 'Input city name'}
      setErrors(newObj)
    } else {
      props.history.push({
        pathname: '/restaurants',
        state: { city }
      })
    }
  }

  return (
    <div>
      <div className="container">
        <h1>Order your favorite food with Foodable</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input style={errors.city ? { border: '1px solid red'} : {}} type="text" className="form-control" placeholder="What's your address?" value={city} onChange={(e) => setCity(e.target.value)}/>
            <span style={{color: "red"}}>{errors.city}</span>
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home;
