import React, { useState } from "react";

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
import { keys } from "@material-ui/core/styles/createBreakpoints";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
}));

const DishItem = ({ dish }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const classes = useStyles();

  const generateRadio = (optionsList, keyName) => {
    optionsList[keyName].map((value) => <h1>{value}</h1>)
  }

  return (
    <>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {dish.name}
            </Typography>
            <Typography component="p" variant="body1">
              {dish.ingredients.join(", ")}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {dish.price}
            </Typography>
          </CardContent>
          <Button variant="outlined" color="primary" onClick={handleToggle}>
            Show backdrop
          </Button>
        </div>
        <CardMedia
          className={classes.cover}
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>
      <Backdrop className={classes.backdrop} open={open}>
        <Paper>
          <FormControl component="fieldset">
            <FormLabel component="legend">siema</FormLabel>
            { dish.ingredientchoice ? 
                Object.keys(dish.ingredientchoice).map((keyName, i) => <h1>{keyName}</h1>) 
                 : null
            }
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={(e) => setValue(e.target.value)}>
            </RadioGroup>
          </FormControl>
        </Paper>
      </Backdrop>
    </>
  );
};

export default DishItem;
