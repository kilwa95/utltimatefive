import React, { useContext } from 'react'
import { Div } from '../style/styled'
import { Container } from '@mui/material'
import Match from '../components/Match'
import { MatchContext } from '../contexts/MatchContext'
import NavMenu from '../components/NavMenu'

const MatchesPage = () => {
  const { matches, isLoading } = useContext(MatchContext)

  return (
    <>
      <NavMenu />
      <Container>
        <Div direction="row" wrap="wrap" top="80px" width="100%">
          {matches.map((match) => (
            <Match
              key={match.id}
              salle={match.salle}
              level={match.level.name}
              ville={match.ville}
              organizer={match.organizer.firstName}
              isLoading={isLoading}
              image={match.image}
            />
          ))}
        </Div>
      </Container>
    </>
  )
}

export default MatchesPage
