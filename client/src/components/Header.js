import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import ListItemLink from './ListItemLink';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Foodable</Link>
          </Typography>
          { isAuthenticated ? 
            <>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <AccountCircle />
              </IconButton>
              <Button color="inherit">Logout</Button>
              <ListItemLink to="/" primary="Home" />
            </> :
            <>
              <Button component={Link} to={'/register'} color="inherit">Register</Button>
              <Button component={Link} to={'/login'} color="inherit">Login</Button>
            </>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header;
