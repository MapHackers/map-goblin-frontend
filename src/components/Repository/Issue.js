import React, { useCallback, useEffect } from 'react';
import { Tabs, Table, Button, Pagination, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { repositoryActions } from '../../store/repository';
import { getIssueListAPI } from '../../util/api/repository';
import useColumns from '../../hooks/useColumns';

const { TabPane } = Tabs;

const Issue = ({ repositoryUserId }) => {
  //* useIssue로 따로 떼어내보장
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const repositoryName = useSelector((state) => state.repository.name);
  const issueWaitingData = useSelector((state) => state.repository.waitIssueList);
  const issueCheckedData = useSelector((state) => state.repository.checkedIssueList);
  const columns = useColumns();
  
  const getIssueList = useCallback(
    async (page, userId, repositoryName, status) => {
      try {
        const res = await getIssueListAPI(page, userId, repositoryName, status);
        if (status === `WAITING`) {
          dispatch(repositoryActions.setWaitingIssueList(res.data.content));
        } else {
          dispatch(repositoryActions.setCheckedIssueList(res.data.content));
        }
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getIssueList(0, userId, repositoryName, `WAITING`);
    getIssueList(0, userId, repositoryName, `CHECKED`);
  }, [getIssueList, repositoryName, userId]);

  return (
    <>
      <Alert
        message="새로운 이슈를 올려주세요!"
        type="warning"
        action={
          <Link to={`/${repositoryUserId}/repositories/${repositoryName}/issues`}>
            <Button size="middle" type="primary">
              지적하기
            </Button>
          </Link>
        }
        style={{ marginBottom: '10px', borderRadius: '15px', fontSize: '15px' }}
      />
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
        <TabPane tab={<span>{issueWaitingData.length} Waiting</span>} key="1">
          <Table columns={columns} pagination={false} dataSource={issueWaitingData} />
          <Pagination
            style={{ marginLeft: '45%', marginTop: '20px' }}
            // current={issueWaitingPage}
            pageSize={8}
            //   onChange={onChangeWaitingPage}
            total={issueWaitingData.length}
          />
        </TabPane>
        <TabPane tab={<span>{issueCheckedData.length} Checked</span>} key="2">
          <Table columns={columns} pagination={false} dataSource={issueCheckedData} />
          <Pagination
            style={{ marginLeft: '45%', marginTop: '20px' }}
            // current={issueCheckedPage}
            pageSize={8}
            //   onChange={onChangeCheckedPage}
            total={issueCheckedData.length}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Issue;
