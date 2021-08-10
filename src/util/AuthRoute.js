import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { userAuthAPI } from './api/user';
import { useDispatch } from 'react-redux';
import { userAuth } from '../store/user';

const AuthRoute = ({ path, exact = false, component }) => {
  // TODO: role을 파라미터로 받아와서 접근 권한을 설정해주자
  const [authenticated, setAuthenticated] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const userToken = window.localStorage.getItem('userToken');

  const authCheck = async () => {
    try {
      // 유저의 token이 만료되었는지 확인
      await userAuthAPI(userToken);
      // token이 유효하면 redux에 유저의 데이터 저장
      await dispatch(userAuth(userToken));
      setAuthenticated(true);
    } catch (e) {
      history.push('/login');
      alert('로그인이 필요합니다.');
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  return <Route exact={exact} path={path} component={authenticated && component} />;
};

export default AuthRoute;
