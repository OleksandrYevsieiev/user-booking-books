/* eslint-disable camelcase */
import * as React from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import moment from 'moment'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import { useAppDispatch } from '../../redux/hooks'
import { addReservation } from '../../features/Reservation/reservationAPI'
import { fetchBooks } from '../../features/BookList/bookAPI'

interface IFormDialog {
  bookId: string
  page: number
  rowsPerPage: number
}

interface IFormInput {
  start_date: string
  end_date: string
}

export const FormDialog = (props: IFormDialog) => {
  const { bookId, page, rowsPerPage } = props
  const dispatch = useAppDispatch()
  const { handleSubmit, control } = useForm<IFormInput>()

  const [open, setOpen] = React.useState(false)
  const [valueFrom, setValueFrom] = React.useState('')

  // Adding it this way, but generally in a real case scenario
  // we most likely will receive all relevant data about user from something like user config
  const userName = 'John Doe'

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const updatedData = { ...data, book_id: bookId, user_name: userName }
    const result = await dispatch(addReservation(updatedData))
    if (result?.status === 201) dispatch(fetchBooks(page, rowsPerPage))
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen}>
        Book this book!
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Enter booking time</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>
              To reserve the book please enter the desired start and end time of booking. Please be
              sure to book at least for 1 hour.
            </DialogContentText>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Controller
                name={'start_date'}
                control={control}
                defaultValue={moment().format()}
                rules={{
                  required: 'Required field',
                  validate: {
                    afterNow: (value) => {
                      setValueFrom(value)
                      return moment(value).isSameOrAfter(valueFrom) || 'Cannot be earlier than now'
                    },
                  },
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <DateTimePicker
                    label='From'
                    disablePast
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField sx={{ mx: 1 }} error helperText={error?.message} {...params} />
                    )}
                  />
                )}
              />
              <Controller
                name={'end_date'}
                control={control}
                defaultValue={moment().format()}
                rules={{
                  required: 'Required field',
                  validate: {
                    minOneHourReservation: (value) =>
                      moment(value).isAfter(moment().add(1, 'hour')) ||
                      'Please reserve at least for 1 hour',
                  },
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <DateTimePicker
                    label='To'
                    disablePast
                    value={value}
                    minDateTime={moment(valueFrom || value).add(59, 'minutes')}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField sx={{ mx: 1 }} error helperText={error?.message} {...params} />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Confirm and book</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
