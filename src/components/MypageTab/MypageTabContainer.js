import React from 'react';
import { Tabs } from 'antd';
import { BookOutlined, EnvironmentOutlined, MessageOutlined } from '@ant-design/icons';

import { withRouter } from 'react-router-dom';
import useMyPageTab from '../../hooks/useMyPageTab';

import Overview from './Overview';
import Maps from './Maps';
import Records from './Records';

const { TabPane } = Tabs;

const MypageTabContainer = ({ isOwner, userInfoName, userId, userInfoId }) => {
  const { typemap, mapList, likeChartData, visitChartData } = useMyPageTab();

  return (
    <div style={{ width: '60vw' }}>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <BookOutlined />
              Overview
            </span>
          }
          key="1"
        >
          <Overview
            userInfoName={userInfoName}
            mapList={mapList}
            likeChartData={likeChartData}
            visitChartData={visitChartData}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <EnvironmentOutlined />
              Maps
            </span>
          }
          key="2"
        >
          <Maps userInfoName={userInfoName} mapList={mapList} userInfoId={userInfoId} />
        </TabPane>
        {isOwner && (
          <TabPane
            tab={
              <span>
                <MessageOutlined />
                Records
              </span>
            }
            key="3"
          >
            <Records userInfoName={userInfoName} userId={userId} typemap={typemap} />
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};

export default withRouter(MypageTabContainer);
