import React, { useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import { MdMoreVert } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { MenuListPaths } from '@/utils/config';

import IconBtn from '../IconButton';

export default ({ navigate, className }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isWideScreen = useSelector(state => state.isWideScreen);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handlePushHistory = path => {
    handleClose();
    navigate(`/${path}`);
  };

  const open = Boolean(anchorEl);

  return (
    <nav className={className}>
      <IconBtn
        type="button"
        onClick={handleClick}
        aria-label="check all menu"
        aria-haspopup="true"
        title="Filter the list by category"
      >
        <MdMoreVert />
      </IconBtn>
      <Popper
        disablePortal={false}
        open={open}
        anchorEl={anchorEl}
        style={{ zIndex: 999 }}
        placement={isWideScreen ? 'left-start' : 'top-end'}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Fade in={open} timeout={500}>
            <Paper elevation={4}>
              <MenuList role="menu">
                <MenuItem onClick={() => navigate('/')}>首页</MenuItem>
                {MenuListPaths.map(t => (
                  <MenuItem
                    key={t.path}
                    onClick={() => handlePushHistory(t.path)}
                  >
                    {t.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          </Fade>
        </ClickAwayListener>
      </Popper>
    </nav>
  );
};
