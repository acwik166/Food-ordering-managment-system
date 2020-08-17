import React from 'react';

const Restaurant = (props) => {
  const { restaurant } = props;
  return (
    <div>
      <h1>{restaurant.name}</h1>
    </div>
  )
}

export default Restaurant;
