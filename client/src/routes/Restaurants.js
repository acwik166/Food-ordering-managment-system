import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';

import Restaurant from '../components/Restaurant';

const Restaurants = () => {
  const [city, setCity] = useState('');

  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">City</label>
        <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <h1>Restaurants</h1>
      { !loading ? 
        <div>
            {restaurants.length > 0 ?
              restaurants.map((restaurant, i) => <Restaurant key={i} restaurant={restaurant} />) :
              <h1>No restaurants in your area</h1>
            }
        </div> :
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      } 
    </>
  )
}

export default Restaurants;
