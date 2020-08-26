import React, { useState, useEffect } from 'react';

import RestaurantItem from '../components/RestaurantItem';
import Spinner from '../components/Spinner';

import styles from '../styles/restaurants.module.css';

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
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (props.location.state.city) {
      fetchRestaurants(props.location.state.city);
    }
  }, [props.location.state.city])

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
    <div className={styles.restaurant}>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="city">City</label>
            <input style={errors.city ? { border: '1px solid red'} : {}} type="text" name="city" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} />
            <span style={{color: "red"}}>{errors.city}</span>
            <button type="submit">Submit</button>
          </div>
        </form>
        { !loading ? 
          <div className="container">
             <div class="row row-cols-4">
              {restaurants.length > 0 ?
                restaurants.map((restaurant, i) => <RestaurantItem key={i} restaurant={restaurant} />) :
                <h1>No restaurants in your area</h1>
              }
             </div>
          </div> :
          <Spinner />
        } 
      </div>
    </div>
  )
}

export default Restaurants;
