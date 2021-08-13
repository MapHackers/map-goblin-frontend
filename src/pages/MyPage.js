import React, { useEffect, useCallback } from 'react';
import CommonLayout from '../components/Layout/CommonLayout';
import ProfileContainer from '../components/Profile/ProfileContainer';
import MypageTabContainer from '../components/MypageTab/MypageTabContainer';
import { Row, Col, Result, Button, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../store/userInfo';
import useProfile from '../hooks/useProfile';
import { useHistory, useLocation } from 'react-router-dom';

const MyPage = (props) => {
  const history = useHistory();
  const location = useLocation();

  const userId = location.pathname.replace('/', '');

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const userInfo = useSelector((state) => state.userInfo);

  const backHome = () => {
    history.push('/main');
  };

  const { userInfoName, userInfoDesc, userInfoProfile, userInfoEmail, isOwner } = useProfile();

  const getUserInformation = useCallback(async () => {
    dispatch(getUserInfo(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    getUserInformation();
  }, [getUserInformation]);

  if (!userInfo.loading) {
    if (userInfo.rejected) {
      return (
        <Result
          status="404"
          title="404"
          subTitle="존재하지 않는 페이지입니다."
          extra={
            <Button type="primary" onClick={backHome}>
              홈으로
            </Button>
          }
        />
      );
    } else {
      return (
        <CommonLayout>
          <div id="testlayout" style={{ margin: '50px 0px 20px 10px', height: '100%' }}>
            <Row>
              <Col
                flex="250px"
                style={{ marginLeft: '100px', marginRight: '50px', height: '100%' }}
              >
                <ProfileContainer
                  user={user}
                  userInfoName={userInfoName}
                  userInfoDesc={userInfoDesc}
                  userInfoProfile={userInfoProfile}
                  userInfoEmail={userInfoEmail}
                  isOwner={isOwner}
                  style={{ height: '100%' }}
                />
              </Col>
              <Col flex="auto">
                <MypageTabContainer
                  userId={userId}
                  isOwner={isOwner}
                  userInfoName={userInfoName}
                  userInfoId={userInfo.userId}
                />
              </Col>
            </Row>
          </div>
        </CommonLayout>
      );
    }
  } else {
    return (
      <div style={{ textAlign: 'center', lineHeight: '100vh', height: '100vh' }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }
};

export default MyPage;
