import React, { useEffect, useState, useContext } from 'react'
import { red } from '@mui/material/colors'
import teamsHttp from '../http/teamsHttp'
import { SecurityContext } from '../contexts/SecurityContext'
import { useHistory } from 'react-router-dom'

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

const Team = ({ team, isLoading, teams, setPlayerAction }) => {
  const [membres, setMembres] = useState([])
  const { user } = useContext(SecurityContext)
  const history = useHistory()

  const joinTeam = async (teamId) => {
    if (!user) {
      history.push('/login')
    }
    const { data } = await teamsHttp.joinTeam(teamId)
    setMembres(data.dataJSON.membres)
    setPlayerAction(true)
  }

  useEffect(() => {
    if (team) {
      setMembres(team.membres)
    }
  }, [])

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          width: '250px',
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
            weight="194"
            image={team.image}
            alt={team.name}
          />
        )}
        {isLoading ? (
          <Skeleton animation="wave" height={20} width="40%" />
        ) : (
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {membres.length === 10 ? (
                <Button variant="contained" color="success">
                  membres full
                </Button>
              ) : (
                <Button
                  disabled={
                    membres.map((m) => m.id).includes(user?.id) ||
                    teams.length > 0
                      ? true
                      : false
                  }
                  onClick={() => joinTeam(team.id)}
                  variant="contained"
                  color="success"
                >
                  joindre cette team
                </Button>
              )}

              <Typography
                style={{ marginTop: '24px' }}
                variant="body"
                color="text.secondary"
              >
                <b>places disponible:</b>{' '}
                <bold style={{ color: 'green' }}>{membres.length}</bold>/10
              </Typography>
            </Box>
          </CardContent>
        )}
      </Card>
    </>
  )
}
export default Team
