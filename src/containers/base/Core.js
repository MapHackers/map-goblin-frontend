import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { userActions, userAuth } from '../../store/user';

const Core = () => {
  const dispatch = useDispatch();

  const userToken = window.localStorage.getItem('userToken');

  const authCheck = async (userToken) => {
    await dispatch(userAuth(userToken));
  };

  useEffect(() => {
    if (!userToken) {
      dispatch(userActions.setLoginStatus(false));
    } else {
      authCheck(userToken);
    }
  }, [dispatch]);

  return <> </>;
};

export default Core;
