import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userActions, userAuth } from '../store/user';

const useAuth = () => {
  const dispatch = useDispatch();

  const userToken = window.localStorage.getItem('userToken');

  const loginStatus = useSelector((state) => state.user.loginStatus);
  const checked = useSelector((state) => state.user.checked);

  const authCheck = async (userToken) => {
    await dispatch(userAuth(userToken));
  };

  useEffect(() => {
    if (!userToken) {
      dispatch(userActions.setLoginStatus(false));
    } else {
      authCheck(userToken);
    }
  }, []);

  return { loginStatus, checked };
};

export default useAuth;
