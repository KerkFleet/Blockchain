import * as React from 'react';
import { ethers } from 'ethers';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PositionedMenu from './PositionedMenu.js'

export default function ButtonAppBar(props) {

  async function requestAccount () {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='primary'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <PositionedMenu data={props.data} {...props}></PositionedMenu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="left">
               SonarchNFT
          </Typography>
          <Button color="inherit" onClick={requestAccount}>Connect Wallet</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
