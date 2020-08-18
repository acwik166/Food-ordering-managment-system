import React, { useState, useEffect } from 'react';

import RestaurantItem from '../components/RestaurantItem';
import Spinner from '../components/Spinner';

const Restaurants = (props) => {
  const [city, setCity] = useState('');
  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState({});

  const fetchRestaurants = async (city) => {
    try {
      setLoading(true);
      const response = await fetch(`api/v1/restaurants/?city=${city}`);
      const data = await response.json();
      setRestaurants(data.data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (props.location.state.city) {
      fetchRestaurants(props.location.state.city);
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (city === '') {
      const newObj = {...errors, city: 'Input city name'}
      setErrors(newObj)
    } else {
      fetchRestaurants(city);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">City</label>
        <input style={errors.city ? { border: '1px solid red'} : {}} type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
        <span style={{color: "red"}}>{errors.city}</span>
        <button type="submit">Submit</button>
      </form>
      { !loading ? 
        <div>
          {restaurants.length > 0 ?
            restaurants.map((restaurant, i) => <RestaurantItem key={i} restaurant={restaurant} />) :
            <h1>No restaurants in your area</h1>
          }
        </div> :
        <Spinner />
      } 
    </div>
  )
}

export default Restaurants;
