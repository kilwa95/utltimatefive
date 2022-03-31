import React from 'react'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material'

const Match = ({ salle, level, organizer, ville }) => {
  return (
    <>
      <Card sx={{ minWidth: 500, maxWidth: 500, marginBottom: '32px' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Niveux: {level}
          </Typography>
          <Typography variant="h5" component="div">
            salle: {salle}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Organizer: {organizer}
          </Typography>
          <Typography variant="body2">
            ville: {ville}
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </>
  )
}
export default Match
