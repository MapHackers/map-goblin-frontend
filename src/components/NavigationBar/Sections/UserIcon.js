import React from 'react';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Menu, Dropdown, Image } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Api from '../../../util/Api';

function UserIcon(props) {
  const history = useHistory();

  const thumbnail = useSelector((state) => state.user.profile)
  const name = useSelector((state) => state.user.userName)
  const userId = useSelector((state) => state.user.userId)

  const onClickLogoutHandler = () => {
    window.localStorage.setItem('userToken', '');
    history.push('/');
  };

  const onClickMyPageHandler = () => {
    history.push(`/${userId}`);
  };

  const UserMenu = (
    <Menu>
      <Menu.Item key="0" style={{ verticalAlign: 'center' }}>
        <Image
          alt="user icon"
          src={
            thumbnail && thumbnail !== 'null'
              ? Api.defaults.baseURL + '/files/' + thumbnail
              : '../../../NoProfile.png'
          }
          preview={false}
          style={{ borderRadius: '5%', width: '5rem', height: '5rem' }}
        />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={onClickMyPageHandler}>
        My Page
      </Menu.Item>
      <Menu.Item key="3" onClick={onClickLogoutHandler}>
        LogOut
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ display: 'flex' }}>
      <UserIconContainer>
        <Image
          alt="user icon"
          src={
            thumbnail && thumbnail !== 'null'
              ? Api.defaults.baseURL + '/files/' + thumbnail
              : '../../../NoProfile.png'
          }
          preview={false}
          style={{ borderRadius: '1.3rem', width: '2.6rem', height: '2.6rem' }}
        />
      </UserIconContainer>
      <div
        style={{
          float: 'right',
        }}
      >
        <Dropdown overlay={UserMenu} trigger={['click']}>
          <h3 style={{ marginTop: '1.2rem', marginLeft: '5px' }} className="ant-dropdown-link">
            {' '}
            {name} <DownOutlined />{' '}
          </h3>
        </Dropdown>
      </div>
    </div>
  );
}


export default React.memo(UserIcon);

const UserIconContainer = styled.div`
  border-radius: 1.3rem;
  background-color: white;
  width: 2.6rem;
  height: 2.6rem;
  margin-top: 0.8rem;
  text-align: center;
  vertical-align: middle;
`;
