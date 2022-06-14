import React from 'react'
import { Div } from '../style/styled'
import { Container } from '@mui/material'
import Match from '../components/Match'
import { deepOrange } from '@mui/material/colors'

import { MatchContext } from '../contexts/MatchContext'
import NavMenu from '../components/NavMenu'
import {
  Select,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
  Skeleton,
  Box,
} from '@mui/material'

const MatchCard = ({ isLoading, match }) => {
  return (
    <>
      <Div direction="row" top="80px" width="100%" alignItems="center">
        <div
          style={{
            fontWeight: '500',
            fontSize: '18px',
            color: '#172C41',
            width: '100%',
          }}
        >
          touts les matches
        </div>
        <Div direction="row" width="100%" alignItems="center">
          <div style={{ marginRight: '10px' }}>Filter :</div>
          <Select
            style={{ width: '100px', marginRight: '10px' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          />
          <Select
            style={{ width: '100px', marginRight: '10px' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          />
          <Select
            style={{ width: '100px' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          />
        </Div>
      </Div>
      <Div direction="column" top="40px" width="1080px">
        <Card
          sx={{
            maxWidth: 1080,
            marginBottom: '32px',
            marginLeft: '16px',
            cursor: 'pointer',
          }}
        >
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  src="https://yt3.ggpht.com/0M4ca-lJ8DKvAh7R9RUKHPp97QgagJs5z0jF6jl8stqrYrvYSKshxVyvKCzZSU6wkx0AkmeZ=s900-c-k-c0x00ffffff-no-rj"
                  style={{
                    marginRight: '10px',
                  }}
                >
                  k
                </Avatar>
                <Typography
                  style={{
                    fontSize: '17px',
                    fontWeight: '400',
                    color: '#959FA8',
                  }}
                >
                  {match.teams[0].name}
                </Typography>
              </Box>
              <Box
                style={{
                  marginLeft: '40px',
                  marginRight: '40px',
                }}
              >
                <Typography style={{ fontSize: '14px', lineHeight: '16px' }}>
                  VS
                </Typography>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Avatar
                  src="https://yt3.ggpht.com/0M4ca-lJ8DKvAh7R9RUKHPp97QgagJs5z0jF6jl8stqrYrvYSKshxVyvKCzZSU6wkx0AkmeZ=s900-c-k-c0x00ffffff-no-rj"
                  style={{
                    marginRight: '10px',
                  }}
                >
                  k
                </Avatar>
                <Typography
                  style={{
                    fontSize: '17px',
                    fontWeight: '400',
                    color: '#959FA8',
                  }}
                >
                  {match.teams[1].name}
                </Typography>
              </Box>
            </Box>
            <Box
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                style={{
                  marginRight: '20px',
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '17px',
                  lineHeight: '20px',
                  color: '#959FA8',
                }}
              >
                {match.slots}
              </Box>
              <Box
                style={{
                  marginRight: '20px',
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '17px',
                  lineHeight: '20px',
                  color: '#959FA8',
                }}
              >
                {match.ville}
              </Box>
              <Box
                style={{
                  marginRight: '20px',
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '17px',
                  lineHeight: '20px',
                  color: '#959FA8',
                }}
              >
                {match.salle}
              </Box>
            </Box>
            <Box
              style={{ display: 'flex', alignItems: 'center', width: '30%' }}
            >
              <Box
                style={{
                  marginRight: '20px',
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '17px',
                  lineHeight: '20px',
                  color: '#959FA8',
                }}
              >
                View Details
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Div>
    </>
  )
}

export default MatchCard
