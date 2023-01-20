import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Modal from 'react-modal';

function formatHeadings(field) {
  let formattedField = field.replace(/_/g, " ");
  return formattedField.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

function isUrl(key,data) {
  if (typeof data[key] === 'string' && data[key].startsWith('https://swapi.dev/api/') && key!="url")
  {return true;}

  return false;
  // var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  // return regexp.test(s);
}

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
  clickableText: {
    cursor: 'pointer',
    '&:hover': {
      color: 'blue',
    },
  },
});

export default function PersonCard({ personURL,fields,headings }) {
  const classes = useStyles();
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
        const response = await fetch(personURL);
        const data = await response.json();

        // Map through the object properties
        const promises = Object.keys(data).map(async (key) => {
            if (isUrl(key,data)) {
                const res = await fetch(data[key]);
                if(res.ok) {
                  const json = await res.json();
                  return { [key]: ["link",json.name,data[key]] }
                }
                else throw new Error(`Error fetching data from ${data[key]}`);
            }
            else return { [key]: data[key] };
        });

        try {
            const results = await Promise.all(promises);
            const finalData = Object.assign({}, ...results);
            console.log(finalData,"final")
            setPerson(finalData);
            setLoading(false);
        } catch(e) {
            console.log(e);
        }
    }
    fetchData();
}, [personURL]);

const openModal = (person) => {
  setSelectedEntity(person);
  setModalIsOpen(true);
};
const closeModal = () => {
  setModalIsOpen(false);
};


  return loading? <Grid container justifyContent="center" alignItems="center" style={{height: '20vh'}}>
  <CircularProgress size={50} color="primary" />
  </Grid>:(
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {person[fields[0]]}
        </Typography>
        <div className={classes.content}>
          {
            Object.keys(person).map(function(key) {

              // console.log(key,person)
              if(Array.isArray(person[key]) && person[key][0]=="link")
              {
                
                return <div className={classes.clickableText} onClick={() => openModal(person[key][2])}>{formatHeadings(key)}: {person[key][1]}</div>
              }
              else
                  return <p>{formatHeadings(key)}: {person[key]}</p>
          })}

        </div>
      </CardContent>
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Person Details"
      // contentStyle={{width: "5%", height: "50%", maxWidth: "none", maxHeight: "none"}}
      className="popup-inner"
      ariaHideApp={false}
      >
      {selectedEntity && <PersonCard personURL={selectedEntity} fields={fields} headings={headings}/>}
    </Modal>
    </Card>
  );
} 
