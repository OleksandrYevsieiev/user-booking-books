import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IReservation } from '../../models/IReservation'

interface ReservationState {
  reservations: IReservation[]
  isLoading: boolean
  error: string
}

const initialState: ReservationState = {
  reservations: [],
  isLoading: false,
  error: '',
}

export const reservationSlice = createSlice({
  name: 'Reservations',
  initialState,
  reducers: {
    reservAdding(state) {
      state.isLoading = true
    },
    reservAddingSuccess(state, action: PayloadAction<IReservation>) {
      state.isLoading = false
      state.error = ''
      state.reservations.push(action.payload)
    },
    reservAddingError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default reservationSlice.reducer
