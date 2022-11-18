import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import booksReducer from '../features/BookList/bookListSlice'
import reservationsReducer from '../features/Reservation/reservationSlice'

export const store = configureStore({
  reducer: {
    books: booksReducer,
    reservations: reservationsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
