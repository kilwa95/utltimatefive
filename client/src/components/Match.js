import React from 'react'
import { red } from '@mui/material/colors'
import RoomIcon from '@material-ui/icons/Room'

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  CardHeader,
  Avatar,
  Skeleton,
} from '@mui/material'

const Match = ({ salle, level, organizer, ville, isLoading }) => {
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
                {organizer[0]}
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
              salle
            )
          }
          subheader={
            isLoading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              ville
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
            <Typography variant="body" color="text.secondary">
              level: {level}
            </Typography>
          </CardContent>
        )}
      </Card>
    </>
  )
}
export default Match
