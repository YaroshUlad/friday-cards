import React from 'react';

import { Box, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/store';
import defaultImage from 'assets/images/ava-img.jpg';
import { RoutePath } from 'common/enums/route-path';
import { logOut } from 'features/login/login-reducer';
import { ReturnComponentType } from 'types/ReturnComponentType';

const settings = ['Profile', 'Packs', 'Logout'];

export const IconMenu = (): ReturnComponentType => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const name = useAppSelector(state => state.login.userInfo.name);
  const avatarImage = useAppSelector(state => state.login.userInfo.avatar);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };
  const onClickHandler = (): void => navigate(RoutePath.Login);

  const handleCloseUserMenu = (title: string): void => {
    setAnchorElUser(null);
    if (title === 'Profile') {
      navigate(RoutePath.Profile);
    }
    if (title === 'Packs') {
      navigate(RoutePath.Packs);
    }
    if (title === 'Logout') {
      dispatch(logOut());
    }
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      {isLoggedIn ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography style={{ color: 'black', paddingRight: '10px' }} variant="h6">
            {name}
          </Typography>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Avatar Image" src={avatarImage || defaultImage} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map(setting => (
              <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </div>
      ) : (
        <Button variant="contained" onClick={onClickHandler}>
          Sign In
        </Button>
      )}
    </Box>
  );
};
