import React from 'react'
import { Header, Menu, MenuWrap, Logo, MenuItems } from '../style/styled'
import { Link, Button } from '@mui/material'

const NavBar = () => {
  return (
    <Header>
      <Menu>
        <MenuWrap>
          <Logo>
            <img
              style={{ marginRight: '12px' }}
              height="32"
              width="32"
              src={
                'https://pbs.twimg.com/profile_images/1196790082725961728/Qe73dpjr_400x400.jpg'
              }
              alt="logo"
            />
            UltimateFive
          </Logo>
          <MenuItems>
            <Link
              style={{ cursor: 'pointer', marginRight: '16px' }}
              underline="none"
              href="#"
            >
              Matches
            </Link>
            <Link
              style={{ cursor: 'pointer', marginRight: '16px' }}
              underline="none"
              href="#"
            >
              Teams
            </Link>
            <Link
              style={{ cursor: 'pointer', marginRight: '16px' }}
              underline="none"
              href="#"
            >
              about us
            </Link>
            <Button style={{ marginRight: '16px' }} variant="contained">
              sign in
            </Button>
            <Button variant="outlined">sign Up</Button>
          </MenuItems>
        </MenuWrap>
      </Menu>
    </Header>
  )
}

export default NavBar
