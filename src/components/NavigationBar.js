


import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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

const NavigationBar = () => {
  const classes = useStyles();
  const [entities, setEntities] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://swapi.dev/api/');
      const data = await res.json();
      setEntities(Object.keys(data));
    }
    fetchData();
  }, []);
  return (
    <div className={classes.root}>
      <AppBar style={{ background: '#252627' }} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button
              color="inherit"
              component={Link}
            //   to={`/${entity}`}
            to='/'
            >
            Home Page
            </Button>
          </Typography>
          {entities.map((entity) => (
            <Button
              color="inherit"
              component={Link}
              to={`/${entity}`}
            // to='/server'
            >
              {entity}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
