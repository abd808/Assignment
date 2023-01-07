import React, { useState, useEffect } from 'react';
import Popup from './Popup';
import Layout from './Layout';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Form, Button, FormControl, FormLabel } from 'react-bootstrap';
import './CSS/CustomForm.css'; // Import custom CSS file
import { CircularProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core';



function Dashboard() {
  const [data, setData] = useState({});
  const [url, setUrl] = useState('');
  const [type, setType] = useState('');
  const [number, setNumber] = useState('');
  const [data_received,setDataReceived] = useState(false);
  const [show_buffer,setBuffer] = useState(false);
  useEffect(() => {
    axios.get(url)
      .then(response => {
        setData(response.data);
        setDataReceived(true);
        setBuffer(false);
      })
      .catch(error => {
        console.error(error);
        window.alert(error);
        setBuffer(false);
      });
  }, [url]);
  

  const handleSubmit = event => {
    setDataReceived(false);
    setBuffer(true);
    event.preventDefault();
    const selectedType = event.target.elements.type.value;
    const selectedNumber = event.target.elements.number.value;
    setType(selectedType);
    setNumber(selectedNumber);
    setUrl(`https://swapi.dev/api/${selectedType}/${selectedNumber}/`);
    console.log(url)
  };

  return (
    <div>
      <Popup />
      <div className="form-container">
      <Form onSubmit={handleSubmit} className="mx-auto custom-form">
        <h1 className="form-title">Welcome to the Star Wars API!</h1>
        <div className="form-subtitle" >
          View information about any character/entity that has ever appeared in a Star Wars movie.
          <br></br>
        </div>
        <Form.Group className="form-group custom-form-group">
          <FormControl title =" Select the type of entity " as="select" id="type" name="type" required variant="outline-primary" className="custom-form-control">
            <option value="people">People</option>
            <option value="starships">Starships</option>
          </FormControl>
          <FormControl title="API returns entity corresponding to number you enter, if it exists" type="text" id="number" name="number" required placeholder="Enter number" variant="outline-primary" className="custom-form-control" style={{ width: '30%' }} />
          <Button type="submit" variant="primary" className="custom-button">Go</Button>
        </Form.Group>
      </Form>
      </div>
      
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '12vh'}}> <h1> Results Here: </h1> </div>.
      
      {show_buffer && <Grid container justify="center" alignItems="center" style={{height: '20vh'}}>
      <CircularProgress size={50} color="secondary" />
      </Grid>}
      {type === 'people' && data_received==true? (
        <div>
        <Layout
          title1="Name"
          value1={data.name}
          title2="Height(cm)"
          value2={data.height}
          title3="Weight(kg)"
          value3={data.mass}
          title4="Hair Colour"
          value4={data.hair_color}
        />
        </div>

      ) : type === 'starships' && data_received==true ? (
      <div>
      <Layout
        title1="Name"
        value1={data.name}
        title2="Model"
        value2={data.model}
        title3="Manufacturer"
        value3={data.manufacturer}
        title4="Cost"
        value4={data.cost_in_credits}
      />
      </div>
        ) : null}
        </div>
        );
              }

export default Dashboard;