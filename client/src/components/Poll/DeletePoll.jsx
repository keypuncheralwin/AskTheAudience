import React, { useState } from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function DeletePoll(props) {

  const manageDeleteRefresh = props.manageDeleteRefresh
  const pollId = props.pollId
  const title = props.title
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleDelete = () => {

    axios.delete(`/api/polls/poll/${pollId}`).then(res => {
        
        console.log(res.data)  
        manageDeleteRefresh()
        setOpen(false);

    }).catch(err => {console.log(err)})
  }

  return (
    <div>
        <RiDeleteBin5Fill onClick={handleClickOpen}/>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this poll?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
