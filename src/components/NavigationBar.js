import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

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

const styles = (theme) => ({
  button: {
    fontSize: '1rem',
    padding: theme.spacing(2),
  },
  buttonSmall: {
    fontSize: '0.6rem',
    padding: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});








const NavigationBar = ({ classes, width }) => {
  // your component code
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
              to='/'
              className={
                width === 'xs' || width === 'sm'
                  ? classes.buttonSmall
                  : classes.button
              }
            >
              Home Page
            </Button>
          </Typography>
          {entities.map((entity) => (
            <Button
              color="inherit"
              component={Link}
              to={`/${entity}`}
              key={entity}
              className={
                width === 'xs' || width === 'sm'
                  ? classes.buttonSmall
                  : classes.button
              }
            >
              {entity}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(withWidth()(NavigationBar));
