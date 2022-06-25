import React, { useContext } from 'react'
import { Header, Menu, MenuWrap, Logo, MenuItems } from '../style/styled'
import { Link, Button, Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { useHistory } from 'react-router-dom'
import { SecurityContext } from '../contexts/SecurityContext'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const NavBar = () => {
  const history = useHistory()
  const { token, logout } = useContext(SecurityContext)

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
            {token ? (
              <>
                <ExitToAppIcon
                  style={{ cursor: 'pointer', marginRight: '16px' }}
                  fontSize="medium"
                  onClick={logout}
                />
                <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
              </>
            ) : (
              <>
                <Button
                  onClick={() => history.push('/login')}
                  style={{ marginRight: '16px' }}
                  variant="contained"
                >
                  sign in
                </Button>
                <Button
                  onClick={() => history.push('/register')}
                  variant="outlined"
                >
                  sign Up
                </Button>
              </>
            )}
          </MenuItems>
        </MenuWrap>
      </Menu>
    </Header>
  )
}

export default NavBar
