import React from 'react'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material'

const Match = () => {
  return (
    <>
      <Card sx={{ minWidth: 500, maxWidth: 500, marginBottom: '32px' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Niveux
          </Typography>
          <Typography variant="h5" component="div">
            MatcheName
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Ville
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
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
