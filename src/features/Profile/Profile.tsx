import React, { ChangeEvent, useState } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Badge, Box, Button, FormControl, FormLabel, Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Navigate, useNavigate } from 'react-router-dom';

import { setAppSnackbarAC } from 'app/app-reducer';
import { useAppDispatch, useAppSelector } from 'app/store';
import defaultImage from 'assets/images/ava-img.jpg';
import { EditableSpan } from 'common/components/editableSpan/EditableSpan';
import { FormWrapper } from 'common/components/formWrapper/FormWrapper';
import { RoutePath } from 'common/enums/route-path';
import { convertFileToBase64 } from 'common/utils/convertFileToBase64';
import { logOut, updateUserInfoTC } from 'features/login/login-reducer';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Profile = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const userInfo = useAppSelector(state => state.login.userInfo);
  const appStatus = useAppSelector(state => state.app.status);
  const _id = useAppSelector(state => state.login.userInfo._id);
  const [isAvaBroken, setIsAvaBroken] = useState(false);

  const navigate = useNavigate();
  if (!isLoggedIn) {
    return <Navigate to={RoutePath.Login} />;
  }

  const logoutCB = (): void => {
    dispatch(logOut());
  };

  const saveChangesHandler = (newValue: string): void => {
    dispatch(updateUserInfoTC({ name: newValue, _id }));
  };
  const isDisabled = appStatus === 'loading';
  const zeroIndex = 0;
  const maxSizeOfImage = 4000000;

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[zeroIndex];

      if (file.size < maxSizeOfImage) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(updateUserInfoTC({ avatar: file64, _id }));
          setIsAvaBroken(false);
        });
      } else {
        dispatch(setAppSnackbarAC('error', 'Image is too big'));
      }
    }
  };
  const errorHandler = (): void => {
    setIsAvaBroken(true);
  };

  return (
    <FormWrapper>
      <h2>It-incubator</h2>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <label htmlFor="avatar">
            <input
              id="avatar"
              type="file"
              onChange={uploadHandler}
              style={{ display: 'none' }}
              accept="image/*"
            />
            <IconButton component="span">
              <PhotoCameraIcon />
            </IconButton>
          </label>
        }
      >
        <Avatar
          onError={errorHandler}
          alt="UserAvatar"
          src={isAvaBroken || !userInfo.avatar ? defaultImage : userInfo.avatar}
          sx={{ width: 150, height: 150 }}
        />
      </Badge>
      <Grid container justifyContent="center">
        <FormControl>
          <FormLabel>
            <h2>Personal information</h2>
          </FormLabel>
          <EditableSpan
            value={userInfo.name || 'userName'}
            isDisabled={isDisabled}
            onChange={saveChangesHandler}
          />
          <Box color="gray" padding="20px">
            {userInfo.email}
          </Box>
          <Grid container justifyContent="space-around">
            <Button
              startIcon={<LogoutIcon />}
              variant="outlined"
              onClick={logoutCB}
              color="primary"
              disabled={isDisabled}
            >
              Log out
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(RoutePath.Packs)}
              color="primary"
              disabled={isDisabled}
            >
              To Packs
            </Button>
          </Grid>
        </FormControl>
      </Grid>
    </FormWrapper>
  );
};
