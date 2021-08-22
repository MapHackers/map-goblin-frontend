import React, { useCallback, useEffect, useState } from 'react';
import { Tabs, Table, Button, Pagination, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useColumns from '../../hooks/useColumns';
import { compareRepositoryAPI, getRequestListAPI } from '../../util/api/repository';
import { repositoryActions } from '../../store/repository';

const { TabPane } = Tabs;

const PullRequest = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userId);
  const repositoryName = useSelector((state) => state.repository.name);
  const requestWaitingData = useSelector((state) => state.repository.requestWaitList);
  const requestAcceptedData = useSelector((state) => state.repository.requestAcceptedList);
  const requestDeniedData = useSelector((state) => state.repository.requestDeniedList);
  const columns = useColumns();

  const [requestLoading, setRequestLoading] = useState(false);

  const getRequestList = useCallback(
    async (page, userId, repositoryName, status) => {
      try {
        const res = await getRequestListAPI(page, userId, repositoryName, status);
        if (status === `WAITING`) {
          dispatch(repositoryActions.setWaitRequestList(res.data.content));
        } else if (status === `ACCEPTED`) {
          dispatch(repositoryActions.setAccpetedRequestList(res.data.content));
        } else {
          dispatch(repositoryActions.setDeniedRequestList(res.data.content));
        }
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch]
  );

  const compareRepository = useCallback(async (userId, repositoryName) => {
    try {
      const res = await compareRepositoryAPI(userId, repositoryName);
      if (res.data.message === undefined) {
        setRequestLoading(true);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    // waiting
    getRequestList(0, userId, repositoryName, `WAITING`);
    // accepted
    getRequestList(0, userId, repositoryName, `ACCEPTED`);
    // denied
    getRequestList(0, userId, repositoryName, `DENIED`);
  }, [getRequestList, repositoryName, userId]);

  useEffect(() => {
    compareRepository(userId, repositoryName);
  }, [compareRepository, repositoryName, userId]);

  return (
    <>
      {requestLoading && (
        <Alert
          message="복사한 지도에 변경사항이 있습니다!"
          type="info"
          action={
            <Link
              to={{
                pathname: `/${userId}/repositories/${repositoryName}/requests`,
                state: { userId: userId, repositoryName: repositoryName },
              }}
            >
              <Button size="middle" type="primary">
                요청하기
              </Button>
            </Link>
          }
          style={{ marginBottom: '10px', borderRadius: '15px', fontSize: '15px' }}
        />
      )}
      <Tabs
        defaultActiveKey="1"
        size="large"
        style={{
          padding: '0px 30px 10px 30px',
          borderStyle: 'solid',
          borderWidth: 'thin',
          borderRadius: '20px',
        }}
      >
        <TabPane tab={<span>{requestWaitingData.length} Waiting</span>} key="1">
          <Table columns={columns} pagination={false} dataSource={requestWaitingData} />
          <Pagination
            style={{ marginLeft: '45%', marginTop: '20px' }}
            pageSize={8}
            total={requestWaitingData.length}
          />
        </TabPane>
        <TabPane tab={<span>{requestAcceptedData.length} Accepted</span>} key="2">
          <Table columns={columns} pagination={false} dataSource={requestAcceptedData} />
          <Pagination
            style={{ marginLeft: '45%', marginTop: '20px' }}
            pageSize={8}
            total={requestAcceptedData.length}
          />
        </TabPane>
        <TabPane tab={<span>{requestDeniedData.length} Denied</span>} key="3">
          <Table columns={columns} pagination={false} dataSource={requestDeniedData} />
          <Pagination
            style={{ marginLeft: '45%', marginTop: '20px' }}
            pageSize={8}
            total={requestDeniedData.length}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default PullRequest;
