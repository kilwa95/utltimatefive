import React, { useContext } from 'react'
import { Div } from '../style/styled'
import { Container } from '@mui/material'

import NavBar from '../components/NavBar'
import Match from '../components/Match'

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Div direction="column" top="80px" width="100%">
          <Match />
          <Match />
        </Div>
      </Container>
    </>
  )
}

export default HomePage
