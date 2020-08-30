import React, { useContext, useEffect, useState } from "react";

import DishItem from '../components/DishItem';

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Backdrop,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from "@material-ui/core";

const Restaurant = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState();
  const [dishes, setDishes] = useState();

  const id = match.params.id;

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/v1/restaurants/${id}`
        );
        const dishesRes = await fetch(
          `http://localhost:3000/api/v1/restaurants/${id}/dishes`
        );
        const dishes = await dishesRes.json();
        const data = await response.json();
        setRestaurant(data.data);
        setDishes(dishes.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRestaurant();
  }, [id]);

  if (restaurant == null || dishes == null) {
    return null;
  }
  console.log(dishes);

  return (
    <Container>
      {restaurant !== null ? (
        <div>
          <h1>{restaurant.name}</h1>
          <Grid container spacing={3}>
            {dishes.map((dish) => (
              <DishItem dish={dish} />
            ))}
          </Grid>
        </div>
      ) : (
        <h1>Restaurant not found</h1>
      )}
    </Container>
  );
};

export default Restaurant;
