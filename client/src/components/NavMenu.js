import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useHistory } from 'react-router-dom'
import { SecurityContext } from '../contexts/SecurityContext'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

const NavMenu = () => {
  const history = useHistory()
  const { token, logout, user } = useContext(SecurityContext)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handlePlayer = () => {
    setAnchorEl(null)
    history.push('/profilePlayer')
  }
  const handleOrganizer = () => {
    setAnchorEl(null)
    history.push('/profileOrganizer')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            UltimateFive
          </Typography>
          <Button color="inherit">Matches</Button>
          <Button color="inherit">Teams</Button>
          <Button color="inherit"> about us</Button>
          {token ? (
            <>
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                {user?.isPlayer ? (
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {/* <MenuItem onClick={handleClose}>{user.email}</MenuItem> */}
                    <MenuItem onClick={handlePlayer}>My account</MenuItem>
                    <MenuItem onClick={logout}>logout</MenuItem>
                  </Menu>
                ) : user?.isOrganizer ? (
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>{user?.email}</MenuItem>
                    <MenuItem onClick={handleOrganizer}>My account</MenuItem>
                    <MenuItem>add new match</MenuItem>
                    <MenuItem onClick={logout}>logout</MenuItem>
                  </Menu>
                ) : (
                  ''
                )}
              </div>
            </>
          ) : (
            <>
              <Button onClick={() => history.push('/login')} color="inherit">
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => history.push('/register')}
                color="success"
              >
                espace player
              </Button>
              <Button
                sx={{ marginLeft: '16px' }}
                variant="contained"
                onClick={() => history.push('/registerOrganizer')}
                color="error"
              >
                espace organizer
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavMenu
