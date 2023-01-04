import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Form, Button, FormControl, FormLabel } from 'react-bootstrap';
import './CustomForm.css'; // Import custom CSS file
import Modal from 'react-bootstrap/Modal';

function ErrorModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.errorMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Dashboard() {
  const [data, setData] = useState({});
  const [url, setUrl] = useState('');
  const [type, setType] = useState('');
  const [number, setNumber] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
        window.alert('An error occurred while making the API request: ' + error);
        setShowErrorModal(true);
      });
  }, [url]);
  
  const handleErrorModalClose = () => setShowErrorModal(false);

  const handleSubmit = event => {
    event.preventDefault();
    const selectedType = event.target.elements.type.value;
    const selectedNumber = event.target.elements.number.value;
    setType(selectedType);
    setNumber(selectedNumber);
    setUrl(`https://swapi.dev/api/${selectedType}/${selectedNumber}/`);
  };

  return (
    <div>
      
      <div className="form-container">
      <Form onSubmit={handleSubmit} className="mx-auto custom-form">
        <h1 className="form-title">Star Wars API</h1>
        <Form.Group className="form-group custom-form-group">
          <FormControl as="select" id="type" name="type" required variant="outline-primary" className="custom-form-control">
            <option value="people">People</option>
            <option value="starships">Starships</option>
          </FormControl>
          <FormControl type="text" id="number" name="number" required placeholder="Enter number" variant="outline-primary" className="custom-form-control" style={{ width: '30%' }} />
          <Button type="submit" variant="primary" className="custom-button">Go</Button>
        </Form.Group>
      </Form>
      </div>
      {/* {showErrorModal && <ErrorModal show={showErrorModal} handleClose={handleErrorModalClose} errorMessage={errorMessage} />} */}
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '12vh'}}> <h1> Results Here: </h1> </div>.
      {type === 'people'? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Mass</TableCell>
              <TableCell>Hair Color</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.height}</TableCell>
              <TableCell>{data.mass}</TableCell>
              <TableCell>{data.hair_color}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : type === 'starships' ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Manufacturer</TableCell>
              <TableCell>Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.model}</TableCell>
              <TableCell>{data.manufacturer}</TableCell>
              <TableCell>{data.cost_in_credits}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
        ) : null}
        </div>
        );
              }

export default Dashboard;