import React, { useState } from 'react'

import {
  Stack, Box, Button, Modal, Typography, Input, MenuItem
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import { Link } from "react-router-dom";

import { useDispatch } from 'react-redux';

import SearchBar from "./SearchBar"

import { logo } from "../utils/constants";

import { loginUser, registerUser, logoutUser } from '../utils/fetchAPI';

import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width: {xs: '40%', md:'25%'}
};

const Navbar = () => {
  const user = useSelector(state => state.user.currentUser);
  const isToken = document.cookie.includes('jwt');

  const [isOpen, setisOpen] = useState(false);

  const handleMenu = (e) => {
    e.preventDefault();
    setisOpen((prev) => (!prev));
  }

  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    name: "",
    password: "",
    email: ""
  });

  const [openLogin, setOpenLogin] = React.useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const [openRegister, setOpenRegister] = React.useState(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(loginData, dispatch);
    handleCloseLogin();
  }

  const handleRegister = (e) => {
    e.preventDefault();
    registerUser(registerData, dispatch);
    handleCloseRegister();
  }

  const handleChangeLogin = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })

  }
  const handleChangeRegister = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    })

  }

  return (
    <>
      <Stack direction="row" alignItems="center"
        p={2}
        sx={{ position: 'sticky', background: 'black', top: 0, justifyContent: 'space-between' }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="logo" height={45} />
        </Link>
        <SearchBar />

        <Box sx={{ display: 'flex', gap: '2rem' }}>
          {!isToken && <Button size='small' variant='contained'
            id='login-btn'
            sx={{ display: { xs: 'none', md: 'flex' } }}
            onClick={handleOpenLogin} >Login</Button>}
          <Modal
            open={openLogin}
            onClose={handleCloseLogin}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
          >
            <Box sx={style}>
              <Typography id="login-modal-title" variant="h4" component="h2"
                sx={{ textAlign: 'center', color: 'red', mb: 5, fontWeight: 'bold' }}>
                Login
              </Typography>
              <Stack sx={{ gap: '2rem', mb: 3 }}>
                <Input name='username' placeholder='Username' type='text' onChange={handleChangeLogin} />
                <Input name='password' placeholder='Password' type='password' onChange={handleChangeLogin} />
                <Button size='small' variant='outlined' color='error'
                  onClick={handleLogin}
                  >login</Button>
              </Stack>
              <Link>Forgot Password?</Link>
            </Box>
          </Modal>


          {!isToken && <Button size='small' variant='contained'
            sx={{ display: { xs: 'none', md: 'flex' } }}
            id='register-btn' onClick={handleOpenRegister} >Register</Button>}
          <Modal
            open={openRegister}
            onClose={handleCloseRegister}
            aria-labelledby="register-modal-title"
            aria-describedby="register-modal-description"
          >
            <Box sx={style}>
              <Typography id="register-modal-title" variant="h4" component="h2"
                sx={{ textAlign: 'center', color: 'red', mb: 5, fontWeight: 'bold' }}>
                Register
              </Typography>
              <Stack sx={{ gap: '2rem', mb: 5 }}>
                <Input name='username' placeholder='Username' type='text' onChange={handleChangeRegister} />
                <Input name='name' placeholder='Name' type='text' onChange={handleChangeRegister} />
                <Input name='password' placeholder='Password' type='password' onChange={handleChangeRegister} />
                {/* <Input name='confirm_password' placeholder='Confirm Password' type='password'  /> */}
                <Input name='email' placeholder='Email' type='email' onChange={handleChangeRegister} />
                <Button size='small' variant='outlined' color='error'
                  onClick={handleRegister}>Register</Button>
              </Stack>
            </Box>
          </Modal>

          {
            isToken &&
            <Box sx={{ display: { xs: 'none', md: 'flex', gap:'3rem' } }}>
              <Link to='/history' id='history-link'>History</Link>
              <Link to='/watchlist' id='watchlist-link'>Watchlist</Link>
            </Box>
          }

          {isToken && <Button size='small' variant='contained'
            sx={{ display: { xs: 'none', md: 'flex' } }}
            id='logout-btn'
            onClick={(e) => (e.preventDefault(), logoutUser(dispatch))} >Logout</Button>}
          <MenuIcon sx={{ color: 'white', display: { xs: 'flex', md: 'none' } }}
            onClick={handleMenu}
          />
        </Box>
      </Stack>
      <Box sx={{ color: 'white', display: { xs: isOpen ? 'block' : 'none', md: 'none' } }}>
        {
          isToken ?
            <>
              <Link to='/history'>
                <MenuItem sx={{ color: 'red' }}>
                  History
                </MenuItem>
              </Link>
              <Link to='/watchlist'>
                <MenuItem sx={{ color: 'red' }}>
                  Watchlist
                </MenuItem>
              </Link>
              <Button onClick={(e) => (e.preventDefault(), logoutUser(dispatch))} sx={{ color: 'red' }} >
                <MenuItem>Logout</MenuItem>
              </Button>
            </> :
            <>
              <MenuItem sx={{ color:'red' }} onClick={handleOpenLogin}>Login</MenuItem>
              <MenuItem sx={{ color:'red' }} onClick={handleOpenRegister}>Register</MenuItem>
            </>
        }
      </Box>

    </>
  )
}

export default Navbar