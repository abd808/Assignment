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
import PersonCard from './PersonCard';
import { useMediaQuery,useTheme } from '@material-ui/core';

import '../CSS/Popup.css'

function formatHeadings(fields) {
  return fields.map(field => {
    let formattedField = field.replace(/_/g, " ");
    return formattedField.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
  });
}


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

const PeopleTable = ({type,fields}) => {
  const classes = useStyles();
  const [headings,setHeadings]=useState(formatHeadings(fields));
  // console.log(type)
  // const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));
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
    setPeople([]);
    setUniqueIds(new Set())
    setPage(0);
    setSelectedPerson(null);
    setHeadings(formatHeadings(fields))
    const fetchData = async () => {
      setLoading(true);
      let id = 1;
      let url= `https://swapi.dev/api/${type}/`
      while (url) {
        const res = await fetch(url);
        const data = await res.json();
        setLoading(false)
        // console.log(url,data.results)
        const uniqueData = data.results.filter(person => !uniqueIds.has(person.url));
        uniqueData.forEach(person => uniqueIds.add(person.url));
        setPeople((prevPeople) => [...prevPeople, ...uniqueData]);
        url = data.next;
        
      }
      setLoading(false);
    };
    fetchData();
  }, [type]);


  return loading? <Grid container justifyContent="center" alignItems="center" style={{height: '20vh'}}>
  <CircularProgress size={50} color="secondary" />
  </Grid> : (
    <div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="people table">
        <TableHead>
          <TableRow  className={classes.header}>
            <TableCell className={classes.header}>ID</TableCell>
            {/* <TableCell className={classes.header}>{headings[0]}</TableCell>
            <TableCell align="right" className={classes.header}>{headings[1]}</TableCell> */}
            {headings.map((field, index) => {
              
            return <TableCell className={classes.header}>{headings[index]}</TableCell>
          })}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedList.map((person) => (
            <TableRow key={person.url}  className={classes.row} onClick={() => openModal(person)}>
              <TableCell component="th" scope="row">
                {person.url.match(/(\d+)\/$/)[1]}
              </TableCell>
              {/* <TableCell>{person[fields[0]]}</TableCell>
              <TableCell align="right">{person[fields[1]]}</TableCell> */}
              {fields.map((field, index) => {
              
            return <TableCell >{person[field]}</TableCell>
               })}

              
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
    ariaHideApp={false}
    >
    {selectedPerson && <PersonCard personURL={selectedPerson.url} fields={fields} headings={headings}/>}
  </Modal>
  </div>
  );
};

export default PeopleTable;
