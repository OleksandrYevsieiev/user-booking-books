import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import './App.css'
import { BasicCard } from './components/BookCard'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { fetchBooks } from './features/BookList/bookAPI'
import { BasicPagination } from './components/Pagination'

export const App = () => {
  const dispatch = useAppDispatch()
  const [page, setPage] = React.useState(0)

  const rowsPerPage = 10

  const { books } = useAppSelector((state) => state.books)

  React.useEffect(() => {
    dispatch(fetchBooks(page, rowsPerPage))
  }, [page])

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ bgcolor: '#cfe8fc', mb: 5, display: 'flex', justifyContent: 'center' }}>
        <BasicPagination
          defaultPage={1}
          count={books.length}
          page={page}
          handleChangePage={handleChangePage}
        />
      </Box>
      <Container
        maxWidth='lg'
        sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}
      >
        {books.map(
          (book) =>
            book.count && (
              <BasicCard
                key={book._id}
                bookId={book._id as string}
                title={book.title}
                description={book.description}
                count={book.count}
              />
            ),
        )}
      </Container>
    </React.Fragment>
  )
}
