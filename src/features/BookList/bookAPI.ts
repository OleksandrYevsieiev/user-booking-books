import axiosInstance from '../../config/axios'
import { IBook } from '../../models/IBook'
import { AppDispatch } from '../../redux/store'
import { booksSlice } from './bookListSlice'

export const fetchBooks = (page: number, rowsPerPage: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(booksSlice.actions.booksFetching())

    const response = await axiosInstance.get<IBook[]>(`api/books?page=${page}&limit=${rowsPerPage}`)

    dispatch(booksSlice.actions.booksFetchingSuccess(response.data))
  } catch (e: any) {
    dispatch(booksSlice.actions.booksFetchingError(e.message))
  }
}
