import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { userActions, userAuth } from '../../store/user';

const Core = () => {
  const dispatch = useDispatch();

  const userToken = window.localStorage.getItem('userToken');

  const authCheck = async () => {
    await dispatch(userAuth(userToken));
  };

  useEffect(() => {
    if (!userToken) {
      dispatch(userActions.setLoginStatus(false));
    } else {
      authCheck(userToken);
    }
  }, []);

  return <> </>;
};

export default Core;
