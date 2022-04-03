import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Div } from '../style/styled'
import { Container } from '@mui/material'
import NavBar from '../components/NavBar'
import Match from '../components/Match'
import { MatchContext } from '../contexts/MatchContext'
import { SecurityContext } from '../contexts/SecurityContext'

const HomePage = () => {
  const { matches, isLoading } = useContext(MatchContext)
  const { token } = useContext(SecurityContext)
  const history = useHistory()

  if (!token) {
    history.push('/login')
  }
  return (
    <>
      <NavBar />
      <Container>
        <Div direction="column" top="80px" width="100%">
          {matches.map((match) => (
            <Match
              key={match.id}
              salle={match.salle}
              level={match.level.name}
              ville={match.ville}
              organizer={match.organizer.firstName}
              isLoading={isLoading}
            />
          ))}
        </Div>
      </Container>
    </>
  )
}

export default HomePage
