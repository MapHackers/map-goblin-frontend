import React, { useCallback, useEffect, useState } from 'react';
import CommonLayout from '../components/Layout/CommonLayout';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Result,
  Row,
  Spin,
  Timeline,
  Comment,
  List,
  Alert,
} from 'antd';
import RequestForm from '../components/Repository/RequestForm';
import { useHistory, withRouter } from 'react-router-dom';
import Api from '../util/Api';
import SimpleMap from '../components/Map/SimpleMap';
import { dateCalculate, getDate } from '../util/dateCalculate';
import {
  deniedRequestDataAPI,
  getRepositoryInfo,
  mergeRequestDataAPI,
  saveRequestReplyAPI,
  selectRequestInfoAPI,
} from '../util/api/repository';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    style={{ textAlign: 'left', width: '70%', marginLeft: '15%' }}
    renderItem={(item) => (
      <li>
        <Comment
          author={item.name}
          avatar={
            item.profile
              ? `${Api.defaults.baseURL}/files/${item.profile}`
              : `${Api.defaults.baseURL}/files/NoProfile.png`
          }
          content={item.content}
          datetime={dateCalculate(item.datetime)}
        />
      </li>
    )}
  />
);

const Editor = ({ onChange, onSubmit, value }) => (
  <>
    <Form.Item style={{ marginLeft: '18%' }}>
      <Row>
        <Col flex="auto">
          <TextArea rows={4} onChange={onChange} value={value} />
        </Col>
        <Col>
          <Button htmlType="submit" onClick={onSubmit} style={{ height: '100%' }} type="primary">
            댓글 달기
          </Button>
        </Col>
      </Row>
    </Form.Item>
  </>
);

const RequestDetailPage = (props) => {
  const history = useHistory();
  const [repositoryInfo, setRepositoryInfo] = useState({});
  const [timeLineLoading, setTimeLineLoading] = useState(false);
  const [addList, setAddList] = useState([]);
  const [modifyList, setModifyList] = useState([]);
  const [deleteList, setDeleteList] = useState([]);
  const [layerList, setLayerList] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [requestStatus, setRequestStatus] = useState('');

  const userId = props.match.params.userId;
  const repositoryName = props.match.params.repositoryName;

  const backHome = () => {
    history.push('/main');
  };

  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState('');

  const handleSubmit = async () => {
    if (commentValue !== '' && commentValue !== undefined) {
      try {
        const response = await saveRequestReplyAPI(`${props.location.pathname}/reply`, {
          content: commentValue,
        });
        setComments([...comments, response.data]);
      } catch (e) {
        console.error(e);
      }
    }
    setCommentValue('');
  };

  const handleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const [dataToSimpleMap, setdataToSimpleMap] = useState([]);

  const init = useCallback(async () => {
    try {
      const response = await getRepositoryInfo(userId, repositoryName);
      setRepositoryInfo(response.data);
    } catch (e) {
      console.error(e, `레포지토리 정보를 불러오는데 실패했습니다.`);
    }

    try {
      const response = await selectRequestInfoAPI(props.location.pathname);
      console.log(response.data);
      let values = response.data.values;
      setTitle(values[0].title);
      setContent(values[0].content);
      setRequestStatus(values[0].status);

      let compareResult = response.data;
      console.log({ compareResult });
      setdataToSimpleMap(compareResult);
      if (compareResult.added !== undefined) {
        setAddList(
          compareResult.added.map((data) => (
            <p>
              {getDate(data.createdDate)} {data.name}
            </p>
          ))
        );
      }

      if (compareResult.modified !== undefined) {
        setModifyList(
          compareResult.modified.map((data) => (
            <p>
              {getDate(data.createdDate)} {data.name}
            </p>
          ))
        );
      }

      if (compareResult.delete !== undefined) {
        setDeleteList(
          compareResult.delete.map((data) => (
            <p>
              {getDate(data.createdDate)} {data.name}
            </p>
          ))
        );
      }

      if (compareResult.layer !== undefined) {
        setLayerList(
          compareResult.layer.map((data) => (
            <p>
              {getDate(data.createdDate)} {data.name}
            </p>
          ))
        );
      }

      if (compareResult.replies !== undefined) {
        setComments(compareResult.replies);
      }
      setTimeLineLoading(true);
      setIsLoading(true);
    } catch (e) {
      console.error(e);
      setNotFound(true);
    }
  }, [props.location.pathname, repositoryName, userId]);

  useEffect(() => {
    init();
  }, [init]);

  const onClickBack = () => {
    history.push(`/${props.match.params.userId}/repositories/${props.match.params.repositoryName}`);
  };

  const onClickMerge = async () => {
    try {
      await mergeRequestDataAPI(`${props.location.pathname}/merge`);
      setRequestStatus('ACCEPTED');
    } catch (e) {
      console.error(`머지하는데 에러가 생겼습니다.`);
    }
  };

  const onClickDenied = async () => {
    try {
      await deniedRequestDataAPI(`${props.location.pathname}/denied`);
      setRequestStatus(`DENIED`);
    } catch (e) {
      console.error(`디나이하는데 에러가 생겼습니다.`);
    }
  };

  if (isLoading) {
    return (
      <CommonLayout>
        <Row style={{ textAlign: 'center' }}>
          <Col span={5}></Col>
          <Col span={14}>
            {requestStatus === 'ACCEPTED' && (
              <Alert
                message="요청 사항이 반영되었습니다!"
                type="info"
                style={{ marginBottom: '10px', borderRadius: '15px', fontSize: '15px' }}
              />
            )}
            {requestStatus === 'DENIED' && (
              <Alert
                message="요청 사항이 거부되었습니다!"
                type="error"
                style={{ marginBottom: '10px', borderRadius: '15px', fontSize: '15px' }}
              />
            )}
            <p style={{ marginTop: '30px', fontSize: '35px' }}>변경사항 반영 요청</p>
            <Divider />
            <RequestForm>
              <Form.Item
                label="제목"
                name="title"
                rules={[{ required: true, message: '요청 제목을 입력해주세요!' }]}
                initialValue={title}
                style={{ width: '85%' }}
              >
                <Input style={{ color: 'black' }} disabled />
              </Form.Item>
              <Form.Item
                label="내용"
                name="content"
                rules={[{ required: true, message: '요청 내용을 입력해주세요!' }]}
                initialValue={content}
                style={{ width: '85%' }}
              >
                <TextArea style={{ color: 'black' }} rows={10} disabled />
              </Form.Item>
              <Form.Item>
                {timeLineLoading && (
                  <Timeline style={{ marginLeft: '15%', width: '50%', textAlign: 'left' }}>
                    {addList.length > 0 && (
                      <Timeline.Item color="green">
                        <p>데이터 추가</p>
                        {addList}
                      </Timeline.Item>
                    )}
                    {modifyList.length > 0 && (
                      <Timeline.Item color="gold">
                        <p>데이터 수정</p>
                        {modifyList}
                      </Timeline.Item>
                    )}
                    {deleteList.length > 0 && (
                      <Timeline.Item color="red">
                        <p>데이터 삭제</p>
                        {deleteList}
                      </Timeline.Item>
                    )}
                    {layerList.length > 0 && (
                      <Timeline.Item>
                        <p>레이어 추가</p>
                        {layerList}
                      </Timeline.Item>
                    )}
                  </Timeline>
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" style={{ marginLeft: '30%' }} onClick={onClickBack}>
                  뒤로가기
                </Button>
                {repositoryInfo.authority === 'OWNER' && requestStatus === 'WAITING' && (
                  <>
                    <Button
                      type="primary"
                      style={{ marginLeft: '10px' }}
                      color="green"
                      onClick={onClickMerge}
                    >
                      반영하기
                    </Button>
                    <Button
                      style={{ marginLeft: '10px' }}
                      type="primary"
                      onClick={onClickDenied}
                      danger
                    >
                      거절하기
                    </Button>
                  </>
                )}
              </Form.Item>
              <div>
                <h1 style={{ fontSize: '2rem' }}> 변경사항 살펴보기 </h1>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img src="/GreenLogo.png" alt="" style={{ width: '40px', height: '40px' }} />
                  <h2 style={{ marginTop: '3px', marginLeft: '10px', marginRight: '15px' }}>
                    {' '}
                    데이터 추가{' '}
                  </h2>
                  <img src="/RedLogo.png" alt="" style={{ width: '40px', height: '40px' }} />
                  <h2 style={{ marginTop: '3px', marginLeft: '10px', marginRight: '15px' }}>
                    {' '}
                    데이터 삭제{' '}
                  </h2>
                  <img src="/YellowLogo.png" alt="" style={{ width: '40px', height: '40px' }} />
                  <h2 style={{ marginTop: '3px', marginLeft: '10px' }}> 데이터 수정 </h2>
                </div>
                <SimpleMap data={dataToSimpleMap} />
              </div>
              {comments.length > 0 && <CommentList comments={comments} />}
              <Comment
                content={
                  <Editor onChange={handleChange} onSubmit={handleSubmit} value={commentValue} />
                }
              />
            </RequestForm>
          </Col>
          <Col span={5}></Col>
        </Row>
      </CommonLayout>
    );
  } else {
    return (
      <div
        style={
          isLoading && notFound
            ? null
            : { textAlign: 'center', lineHeight: '100vh', height: '100vh' }
        }
      >
        {isLoading && notFound ? (
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
        ) : (
          <Spin size="large" tip="Loading..." />
        )}
      </div>
    );
  }
};

export default withRouter(RequestDetailPage);
