import React from 'react'
import { red } from '@mui/material/colors'

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
  Skeleton,
  Box,
} from '@mui/material'

const Match = ({ match, isLoading }) => {
  return (
    <>
      <Card sx={{ maxWidth: 345, marginBottom: '32px', marginLeft: '16px' }}>
        <CardHeader
          avatar={
            isLoading ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            ) : (
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {match.organizer[0]}
              </Avatar>
            )
          }
          title={
            isLoading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              match.salle
            )
          }
          subheader={
            isLoading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              match.ville
            )
          }
        />
        {isLoading ? (
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <CardMedia
            component="img"
            height="194"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFZ1klR_m15J8tEyHPLeVJLpV1VziaTf7RGw&usqp=CAU"
            alt="Paella dish"
          />
        )}
        {isLoading ? (
          <Skeleton animation="wave" height={20} width="40%" />
        ) : (
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body" color="text.secondary">
                <b>niveux:</b> {match.level?.name}
              </Typography>
              <Typography variant="body" color="text.secondary">
                <b>prix:</b> {match.price} €
              </Typography>
              <Typography variant="body" color="text.secondary">
                <b>places disponible:</b> {match.square}
              </Typography>
            </Box>
          </CardContent>
        )}
      </Card>
    </>
  )
}
export default Match
