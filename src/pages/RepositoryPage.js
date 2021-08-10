import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import {
  FileTextOutlined,
  EnvironmentOutlined,
  PullRequestOutlined,
  ExclamationCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import CommonLayout from '../components/Layout/CommonLayout';
import MapContainer from '../components/Map/MapContainer';

import { Breadcrumb, Tabs } from 'antd';

import InfoSetting from '../components/Repository/InfoSetting';

import useRepository from '../hooks/useRepository';
import Information from '../components/Repository/Information';
import Issue from '../components/Repository/Issue';
import PullRequest from '../components/Repository/PullRequest';
import PullData from '../components/Repository/PullData';
import { repositoryVisitCount } from '../util/api/repository';

const { TabPane } = Tabs;

const colorArray = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

const Description = styled.div`
  margin: 20px 100px 20px 100px;
`;

const RepositoryPage = () => {
  const { repositoryUserId, repositoryName, repositoryInfo, backHome, onClickClone, onClickLike } =
    useRepository();
  const userUrl = `/${repositoryUserId}`;

  useEffect(() => {
    repositoryVisitCount(repositoryUserId, repositoryName);
  }, [repositoryName, repositoryUserId]);

  return (
    <CommonLayout>
      <Breadcrumb style={{ fontSize: '20px', textAlign: 'left', padding: '30px 0px 20px 30px' }}>
        <Breadcrumb.Item>
          <a href={userUrl}>{repositoryUserId}</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="">{repositoryName}</a>
          {repositoryInfo.source === 'CLONE' && (
            <div style={{ fontSize: '15px' }}>
              원본 지도 :
              {repositoryInfo.hostUserId === null ? (
                <p style={{ color: 'blue', display: 'inline' }}>
                  &nbsp;원본 지도가 삭제되었습니다.
                </p>
              ) : (
                <a
                  style={{ color: 'blue' }}
                  href={
                    '/' + repositoryInfo.hostUserId + '/repositories/' + repositoryInfo.hostRepoName
                  }
                >
                  &nbsp;
                  {`/${repositoryInfo.hostUserId}/repositories/${repositoryInfo.hostRepoName}`}
                </a>
              )}
            </div>
          )}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Tabs defaultActiveKey="1" size="large" style={{ padding: '0px 30px 10px 30px' }}>
        <TabPane
          tab={
            <span>
              <FileTextOutlined />
              지도 소개
            </span>
          }
          key="1"
        >
          <Description>
            <Information
              repositoryInfo={repositoryInfo}
              colorArray={colorArray}
              onClickLike={onClickLike}
              onClickClone={onClickClone}
            />
          </Description>
        </TabPane>
        <TabPane
          tab={
            <span>
              <EnvironmentOutlined />
              지도
            </span>
          }
          key="2"
        >
          <PullData />
          <MapContainer
            mapId={repositoryInfo.mapId}
            authority={repositoryInfo.authority}
            key="mapContainer"
          />
        </TabPane>
        {repositoryInfo.source === 'HOST' && (
          <TabPane
            tab={
              <span>
                <ExclamationCircleOutlined />
                지적하기
              </span>
            }
            key="3"
          >
            <Issue repositoryUserId={repositoryUserId} />
          </TabPane>
        )}

        {repositoryInfo.source === 'HOST' && (
          <TabPane
            tab={
              <span>
                <PullRequestOutlined />
                변경 요청
              </span>
            }
            key="4"
          >
            <PullRequest />
          </TabPane>
        )}
        {repositoryInfo.authority === 'OWNER' && (
          <TabPane
            tab={
              <span>
                <SettingOutlined />
                설정
              </span>
            }
            key="5"
          >
            <InfoSetting repositoryInfo={repositoryInfo} />
          </TabPane>
        )}
      </Tabs>
    </CommonLayout>
  );
};

export default withRouter(RepositoryPage);
