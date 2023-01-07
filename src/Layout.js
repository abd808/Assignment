import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    textAlign: 'center',
    backgroundColor: '#eee',
    borderRadius: '10px',
  },
  value: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#666',
  },
}));


function Layout(props) {

  const classes = useStyles();
      return (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6" align="center" className={classes.title}>{props.title1}</Typography>
              <Typography variant="h4" align="center" className={classes.value}>{props.value1}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6" align="center" className={classes.title}>{props.title2}</Typography>
              <Typography variant="h4" align="center" className={classes.value}>{props.value2}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6" align="center" className={classes.title}>{props.title3}</Typography>
              <Typography variant="h4" align="center" className={classes.value}>{props.value3}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6" align="center" className={classes.title}>{props.title4}</Typography>
              <Typography variant="h4" align="center" className={classes.value}>{props.value4}</Typography>
            </Paper>
          </Grid>
        </Grid>
    );
  }

  export default Layout;
  