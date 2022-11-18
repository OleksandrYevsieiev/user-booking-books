/* eslint-disable camelcase */
import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useAppDispatch } from '../../redux/hooks'
import { addReservation } from '../../features/Reservation/reservationAPI'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import moment, { Moment } from 'moment'

interface IFormDialog {
  bookId: string
}

export const FormDialog = (props: IFormDialog) => {
  const { bookId } = props
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(false)
  const [valueFrom, setValueFrom] = React.useState<Moment | null>(moment())
  const [valueTo, setValueTo] = React.useState<Moment | null>(moment())

  const data = {
    book_id: bookId,
    user_name: 'John Doe',
    start_date: '01.01.2022',
    end_date: '01.02.2022',
  }

  // Adding it this way, but generally in a real case scenario
  // we most likely will receive all relevant data about user from something like user config
  const userName = 'John Doe'

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleReserve = () => {
    dispatch(addReservation(data))
    setOpen(false)
  }

  const handleChangeFrom = (newValue: Moment | null) => {
    console.log(newValue, 'valueFrom')

    setValueFrom(newValue)
  }

  const handleChangeTo = (newValue: Moment | null) => {
    console.log(moment(newValue), 'valueTo')

    setValueTo(newValue)
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
          <DialogContentText sx={{ my: 2 }}>From:</DialogContentText>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              label='Date&Time picker'
              value={valueFrom}
              onChange={handleChangeFrom}
              renderInput={(params) => <TextField {...params} />}
            />
            <DialogContentText sx={{ my: 2 }}>To:</DialogContentText>
            <DateTimePicker
              label='Date&Time picker'
              value={valueTo}
              onChange={handleChangeTo}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleReserve}>Confirm and book</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
