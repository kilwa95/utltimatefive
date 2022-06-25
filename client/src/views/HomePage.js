import React from 'react'
import NavMenu from '../components/NavMenu'
import Video from '../components/Video'
import { Container, Button } from '@mui/material'

const HomePage = () => {
  return (
    <React.Fragment>
      <NavMenu />
      <Video />
      <section>
        <Container
          sx={{ paddingTop: '8rem!important', paddingBottom: '6rem!important' }}
        >
          <div>
            <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
              Faciliter gestion et réservation
            </h2>
          </div>
          <div style={{ display: 'flex' }}>
            <p style={{ textAlign: 'center' }}>
              Aujourd’hui, avec la montée en puissance du foot en salle en
              France, de nombreuses problématiques sont apparues pour les
              joueurs, mais également pour les gérants de complexe. Au travers
              d’un logiciel de gestion dédié aux professionnels, mais également
              d’une application mobile pour les passionnés de foot en salle,
              tous deux connectés, fivezone est la solution qui révolutionne le
              monde du foot en salle.
            </p>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ width: '529px' }}>
              <img
                src="https://fivezone.fr/_nuxt/img/5df0477.png"
                width="529"
                height="529"
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '80px',
              }}
            >
              <h2>Logiciel de gestion pour les pros.</h2>
              <p>
                Gérez vos réservations en temps réel, stockez les informations
                de vos joueurs dans une base de données, modifiez à votre guise
                les tarifs de votre complexe et suivez en temps réel toutes vos
                statistiques grâce à notre logiciel de gestion dédié aux gérants
                de foot en salle, fivezone pro.
              </p>
              <Button sx={{ width: 'fit-content' }} variant="contained">
                se connecter
              </Button>
            </div>
          </div>
        </Container>
      </section>
      <div></div>
    </React.Fragment>
  )
}

export default HomePage
