import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import { CircularProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Modal from 'react-modal';
import Popup from '../Popup';
import PersonCard from './PersonCard';

import '../CSS/Popup.css'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    backgroundColor: '#904E55',
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  row: {
    backgroundColor: '#F2EFE9',
  },
});

const PeopleTable = () => {
  const classes = useStyles();
  const [people, setPeople] = useState([]);
  const [uniqueIds, setUniqueIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  var paginatedList = people.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const openModal = (person) => {
    setSelectedPerson(person);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let id = 1;
      let url= 'https://swapi.dev/api/people/'
      while (url) {
        const res = await fetch(url);
        const data = await res.json();
        setLoading(false)
        console.log(url,data.results)
        const uniqueData = data.results.filter(person => !uniqueIds.has(person.url));
        uniqueData.forEach(person => uniqueIds.add(person.url));
        setPeople((prevPeople) => [...prevPeople, ...uniqueData]);
        url = data.next;
        
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleClick = () => {
    alert("Hi");
  };

  return loading? <Grid container justify="center" alignItems="center" style={{height: '20vh'}}>
  <CircularProgress size={50} color="secondary" />
  </Grid> : (
    <div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="people table">
        <TableHead>
          <TableRow  className={classes.header}>
            <TableCell className={classes.header}>ID</TableCell>
            <TableCell className={classes.header}>Name</TableCell>
            <TableCell align="right" className={classes.header}>Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedList.map((person) => (
            <TableRow key={person.url}  className={classes.row} onClick={() => openModal(person)}>
              <TableCell component="th" scope="row">
                {person.url.match(/(\d+)\/$/)[1]}
              </TableCell>
              <TableCell>{person.name}</TableCell>
              <TableCell align="right">{person.gender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={people.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
    <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="Person Details"
    // contentStyle={{width: "5%", height: "50%", maxWidth: "none", maxHeight: "none"}}
    className="popup-inner"
    >
    {selectedPerson && <PersonCard personURL={selectedPerson.url}/>}
  </Modal>
  </div>
  );
};

export default PeopleTable;
