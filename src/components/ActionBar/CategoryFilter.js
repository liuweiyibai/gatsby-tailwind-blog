import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdFilterList } from 'react-icons/md';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';

import IconBtn from '../IconButton';
import { CategoryListPaths } from '@/utils/config';
import { SET_CATEGORY_FILTER_KEYWORD } from '@/store';

export default () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const isWideScreen = useSelector(state => state.isWideScreen);

  const handleSelect = keyword => {
    setAnchorEl(null);
    dispatch({
      type: SET_CATEGORY_FILTER_KEYWORD,
      payload: keyword,
    });
  };

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <nav>
      <IconBtn
        type="button"
        onClick={handleClick}
        aria-label="Filter by category"
        aria-haspopup="true"
        title="Filter the list by category"
      >
        <MdFilterList />
      </IconBtn>
      <Popper
        disablePortal={true}
        open={open}
        anchorEl={anchorEl}
        style={{ zIndex: 999 }}
        placement={isWideScreen ? 'left-start' : 'top-end'}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Grow in={open} timeout={500}>
            <Paper elevation={4}>
              <MenuList role="menu">
                {CategoryListPaths.map(t => (
                  <MenuItem key={t.key} onClick={() => handleSelect(t.key)}>
                    {t.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          </Grow>
        </ClickAwayListener>
      </Popper>
    </nav>
  );
};
