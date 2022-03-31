import React, { useContext } from 'react'
import { Div } from '../style/styled'
import { Container } from '@mui/material'
import NavBar from '../components/NavBar'
import Match from '../components/Match'
import { MatchContext } from '../contexts/MatchContext'

const HomePage = () => {
  const { matches } = useContext(MatchContext)

  return (
    <>
      <NavBar />
      <Container>
        <Div direction="column" top="80px" width="100%">
          {matches.map((match) => () => (
            <Match
              key={match.id}
              salle={match.name}
              level={match.level}
              ville={match.ville}
              organizer={match.organizer}
            />
          ))}
        </Div>
      </Container>
    </>
  )
}

export default HomePage
