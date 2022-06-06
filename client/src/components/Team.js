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
  Button,
} from '@mui/material'

const Team = ({ team, isLoading }) => {
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          marginBottom: '32px',
          marginLeft: '16px',
          cursor: 'pointer',
        }}
      >
        <CardHeader
          title={
            isLoading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              team.name
            )
          }
          subheader={
            isLoading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              team.level?.name
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
            image="https://yt3.ggpht.com/0M4ca-lJ8DKvAh7R9RUKHPp97QgagJs5z0jF6jl8stqrYrvYSKshxVyvKCzZSU6wkx0AkmeZ=s900-c-k-c0x00ffffff-no-rj"
            alt="Paella dish"
          />
        )}
        {isLoading ? (
          <Skeleton animation="wave" height={20} width="40%" />
        ) : (
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Button variant="contained" color="success">
                joindre cette team
              </Button>
              {/* <Typography variant="body" color="text.secondary">
                <b>places disponible:</b> {match.square}
              </Typography> */}
            </Box>
          </CardContent>
        )}
      </Card>
    </>
  )
}
export default Team
