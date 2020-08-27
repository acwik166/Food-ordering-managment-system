import React, { useContext, useEffect, useState } from 'react';

const Restaurant = ({ match }) => {
  const [loading, setLoading] = useState(false)
  const [restaurant, setRestaurant] = useState();

  const id = match.params.id;

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/v1/restaurants/${id}`);
        const data = await response.json();
        setRestaurant(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRestaurant();
  }, [id])

  if (restaurant == null) {
    return null;
  }

  return (
    <div>
      <div>
        <img src="https://post.healthline.com/wp-content/uploads/2019/04/Various_Sandwiches_1200x628-facebook.jpg" />
      </div>
      <div className="container">
        {restaurant !== null ?
          <div>
            <h1>{restaurant.name}</h1> 
          </div> :
          <h1>Restaurant not found</h1>
        }
      </div>
    </div>
  )
}

export default Restaurant;
