import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { FormDialog } from '../FormDialog'

interface IBasicCard {
  bookId: string
  title: string
  description: string
  count: number
  page: number
  rowsPerPage: number
}

export const BasicCard = (props: IBasicCard): JSX.Element => {
  const { bookId, title, description, count, page, rowsPerPage } = props

  return (
    <Card sx={{ minWidth: 350, maxWidth: 450 }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {count < 20
            ? `Only ${count} remained in stock!`
            : `${count} books are available for booking.`}
        </Typography>
        <Typography variant='body2'>{description}</Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center', mb: 1.5 }}>
        <FormDialog bookId={bookId} page={page} rowsPerPage={rowsPerPage} />
      </CardActions>
    </Card>
  )
}
