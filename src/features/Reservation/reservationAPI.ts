import axiosInstance from '../../config/axios'
import { IReservation } from '../../models/IReservation'
import { AppDispatch } from '../../redux/store'
import { reservationSlice } from './reservationSlice'

export const addReservation = (data: IReservation) => async (dispatch: AppDispatch) => {
  try {
    dispatch(reservationSlice.actions.reservAdding())

    const result = await axiosInstance.post(`api/books/reservation?book_id=${data.book_id}`, data)
    if (result?.status === 201) alert('You have sucessfully reserved a book!')
    dispatch(reservationSlice.actions.reservAddingSuccess(result.data))
  } catch (e: any) {
    dispatch(reservationSlice.actions.reservAddingError(e.message))
    alert('Something went wrong. Probably try one more time?')
  }
}
