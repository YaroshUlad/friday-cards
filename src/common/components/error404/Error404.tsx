import React from 'react';

import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import error404img from 'assets/images/404.svg';
import style from 'common/components/error404/error404.module.css';
import { RoutePath } from 'common/enums/route-path';
import { ReturnComponentType } from 'types/ReturnComponentType';

const Error404 = (): ReturnComponentType => {
  const navigate = useNavigate();
  const handleClickCancelRegister = (): void => navigate(RoutePath.Login);

  return (
    <div className={style.error_box}>
      <div>
        <h2 className={style.error_title}>O KURWA!</h2>
        <p className={style.error_message}>Sorry! Page not found!</p>
        <Button variant="contained" onClick={handleClickCancelRegister}>
          Back to home page
        </Button>
      </div>
      <div>
        <img src={error404img} alt="404 error" />
      </div>
    </div>
  );
};

export default Error404;
