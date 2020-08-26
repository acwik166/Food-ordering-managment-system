import React from 'react';

import '../styles/restaurantItem.module.css';

const RestaurantItem = (props) => {
  const { restaurant } = props;
  return (
    <div className="card col" style={{width: '18rem'}}>
      <img src="..." className="card-img-top" alt="..."/>
      <h1>{restaurant.name}</h1>
      <div className="card-body">
        <p className="card-text">Some quick example text to b</p>
      </div>
    </div>
  )
}

export default RestaurantItem;
