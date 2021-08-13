import React from 'react';
import styled from 'styled-components';

import { List, Image } from 'antd';

import { useSelector } from 'react-redux';

import Api from '../../util/Api';
import { dateCalculate } from '../../util/dateCalculate';
import { Link } from 'react-router-dom';

const Container = styled.div`
  .title {
    margin-bottom: 20px;
    text-align: left;
    font-size: 20px;
    font-weight: 700;
  }
`;

const Records = ({ userInfoName, userId, typemap }) => {
  const alarms = useSelector((state) => state.alarm.userAlarm);
  return (
    <Container>
      <div className="title">{userInfoName}님의 알림 목록</div>
      <div className="demo-infinite-container" style={{ height: '700px', overflow: 'auto' }}>
        <List
          itemlayout="horizontal"
          size="medium"
          layout="vertical"
          dataSource={alarms}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 8,
          }}
          renderItem={(alarm) => (
            <List.Item
              actions={[<div key="list-vertical-like-o">{dateCalculate(alarm.date)}</div>]}
            >
              <List.Item.Meta
                avatar={
                  <Image
                    width="2rem"
                    height="2rem"
                    alt="example"
                    src={Api.defaults.baseURL + '/files/' + alarm.thumbnail}
                    style={{ borderRadius: '10%' }}
                    fallback="no-image3.png"
                    preview={false}
                  />
                }
                title={
                  alarm.read ? (
                    <Link
                      to={`/${userId}/repositories/${alarm.spaceName}`}
                      style={{ marginLeft: '10px', fontSize: '14px' }}
                    >
                      <text style={{ fontWeight: 'bold' }}>{alarm.srcMemberName}</text>
                      님이 회원님의 {typemap[alarm.alarmType]}
                    </Link>
                  ) : (
                    <Link
                      to={`/${userId}/repositories/${alarm.spaceName}`}
                      style={{ marginLeft: '10px', fontSize: '14px', color: '#36A2EB' }}
                    >
                      <text style={{ fontWeight: 'bold' }}>{alarm.srcMemberName}</text>
                      님이 회원님의 {typemap[alarm.alarmType]}
                    </Link>
                  )
                }
              />
            </List.Item>
          )}
        />
      </div>
    </Container>
  );
};

export default Records;
