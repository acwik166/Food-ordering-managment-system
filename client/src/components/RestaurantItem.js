import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const RestaurantItem = (props) => {
  const classes = useStyles();
  const { restaurant } = props;
  return (
    // <div className="card col" style={{width: '18rem'}}>
    //   <img src="..." className="card-img-top" alt="..."/>
    //   <Link to={`restaurants/${restaurant.id}`}><h1>{restaurant.name}</h1></Link>
    //   <div className="card-body">
    //     <p className="card-text">Some quick example text to b</p>
    //   </div>
    // </div>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {restaurant.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default RestaurantItem;
