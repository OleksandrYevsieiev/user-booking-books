import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'

import './App.css'
import { BasicCard } from './components/BookCard'

function App() {
  return (
    <div className='App'>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '100vh' }}
      >
        <BasicCard
          title='Great Book'
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi corporis officiis ipsum quaerat quo incidunt suscipit iste laboriosam aspernatur repellat!'
          count={15}
        />
      </Grid>
    </div>
  )
}

export default App
