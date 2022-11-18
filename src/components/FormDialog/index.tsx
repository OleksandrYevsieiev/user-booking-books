import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export const FormDialog = () => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Book this book!
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter booking time</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reserve the book please enter the desired start and end time of booking. Please be
            sure to book at least for 1 hour.
          </DialogContentText>
          <DialogContentText sx={{ mt: 1.5 }}>From:</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='start_time'
            type='datetime-local'
            fullWidth
            variant='standard'
          />
          <DialogContentText sx={{ my: 1.5 }}>To:</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='end_time'
            type='datetime-local'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Confirm and book</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
