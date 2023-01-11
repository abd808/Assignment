import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 400,
    margin: '20px auto',
    textAlign: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: '10px 0',
  },
  content: {
    fontSize: 14,
    textAlign: 'left',
    margin: '10px auto',
    padding: '0 20px',
    lineHeight: '20px'
  },
});

export default function PersonCard({ personURL }) {
  const classes = useStyles();
  const [person, setPerson] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(personURL);
      const data = await response.json();
      setPerson(data);
      setLoading(false)
    }
    fetchData();
  }, [personURL]);

  return loading? <Grid container justify="center" alignItems="center" style={{height: '20vh'}}>
  <CircularProgress size={50} color="primary" />
  </Grid>:(
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {person.name}
        </Typography>
        <div className={classes.content}>
          <p>Height: {person.height}</p>
          <p>Mass: {person.mass}</p>
          <p>Hair Color: {person.hair_color}</p>
          <p>Skin Color: {person.skin_color}</p>
          <p>Eye Color: {person.eye_color}</p>
          <p>Birth Year: {person.birth_year}</p>
          <p>Gender: {person.gender}</p>
        </div>
      </CardContent>
    </Card>
  );
}
