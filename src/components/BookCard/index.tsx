import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { FormDialog } from '../FormDialog'

interface IBasicCard {
  title: string
  description: string
  count: number
}

export const BasicCard = (props: IBasicCard) => {
  const { title, description, count } = props

  return (
    <Card sx={{ minWidth: 275, maxWidth: 450 }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {`Only ${count} remained in stock!`}
        </Typography>
        <Typography variant='body2'>{description}</Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center', mb: 1.5 }}>
        <FormDialog />
      </CardActions>
    </Card>
  )
}
