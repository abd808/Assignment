import { Modal, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalPaper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: '70%',
      height: '70%',
    },
  }));

const MyModal = ({ onOpen, onClose, children }) => {
    const classes = useStyles();
    return (
        <Modal
            open={onOpen}
            onClose={onClose}
            className={classes.modal}
            closeAfterTransition
            BackdropProps={{ timeout: 500 }}
        >
            <div className={classes.modalPaper}>{children}</div>
        </Modal>
    );
};
