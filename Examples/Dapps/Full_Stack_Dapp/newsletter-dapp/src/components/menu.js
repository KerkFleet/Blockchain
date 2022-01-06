import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';


export default function PositionedMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubscribe = () => {
    props.subscribe();
    handleClose();
  };

  const handleSendNewsletter = () => {
    props.sendNewsLetter();
    handleClose();
  };

  const handleShowNewsletter = () => {
    props.showNewsletter();
    handleClose();
  };

  return (
    <div>
      <MenuIcon
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        align='left'
      >
      </MenuIcon>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleShowNewsletter}>Show Newsletters</MenuItem>
        <MenuItem onClick={handleSendNewsletter}>Send Newsletter</MenuItem>
        <MenuItem onClick={handleSubscribe}>Subscribe</MenuItem>
      </Menu>
    </div>
  );
}
