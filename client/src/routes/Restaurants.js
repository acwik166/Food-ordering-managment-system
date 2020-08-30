import React, { useState, useEffect } from 'react';

import RestaurantItem from '../components/RestaurantItem';
import Spinner from '../components/Spinner';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    marginTop: 50
  }
}));

const Restaurants = (props) => {
  const [city, setCity] = useState('');
  const [errors, setErrors] = useState([]);

  const [propsError, setPropsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState({});

  let propsCity;
  if (props.location.state?.city !== undefined) {
    propsCity = props.location.state.city;
  }

  const fetchRestaurants = async (city) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/v1/restaurants/?city=${city}`);
      const data = await response.json();
      setRestaurants(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (propsCity) {
      fetchRestaurants(propsCity);
    } 
    setPropsError(true);
  }, [propsCity])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (city === '') {
      const newObj = {...errors, city: 'Input city name'}
      setErrors(newObj)
    } else {
      fetchRestaurants(city);
    }
  }

  const classes = useStyles();

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <input style={errors.city ? { border: '1px solid red'} : {}} type="text" name="city" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} />
          <span style={{color: "red"}}>{errors.city}</span>
          <button type="submit">Submit</button>
        </div>
      </form>
      <form noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <Button variant="contained" color="primary">
          Search
        </Button>
      </form>
      { !loading ? 
        <Grid className={classes.grid} container spacing={3}>
          {restaurants.length > 0 ?
            restaurants.map((restaurant, i) => <RestaurantItem key={i} restaurant={restaurant} />) :
            propsError ? 
            <h1>Please provide a city</h1> :
            <h1>No restaurants in your area</h1>
          }
        </Grid> :
        <Spinner />
      } 
    </Container>
  )
}

export default Restaurants;
