import React, { useEffect, useState } from 'react';
import CommonLayout from "../components/Layout/CommonLayout";
import { Button, Col, Divider, Form, Input, Result, Row, Spin, Timeline, Comment, List, Alert } from "antd";
import RequestForm from "../components/Repository/RequestForm";
import { useDispatch } from "react-redux";
import { deniedRequestData, mergeRequestData, saveRequestReply, selectRequestInfo } from "../_actions/repository_action";
import { withRouter } from "react-router-dom";
import Api from "../util/Api";
import SimpleMap from '../components/Map/SimpleMap';

const { TextArea } = Input;

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 18,
            offset: 10,
        },
        sm: {
            span: 1,
            offset: 15,
        },
    },
};

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        style={{textAlign: "left", width: "70%", marginLeft: "15%"}}
        renderItem={item => (
            <li>
                <Comment
                    author={item.name}
                    avatar={item.profile ? `${Api.defaults.baseURL}/files/${item.profile}` : `${Api.defaults.baseURL}/files/NoProfile.png`}
                    content={item.content}
                    datetime={alarmCalculate(item.datetime)}
                />
            </li>
        )}
    />
);

const Editor = ({ onChange, onSubmit, value }) => (
    <>
        <Form.Item style={{ marginLeft: "18%" }}>
            <Row>
                <Col flex="auto">
                    <TextArea rows={4} onChange={onChange} value={value} />
                </Col>
                <Col>
                    <Button htmlType="submit" onClick={onSubmit} style={{ height: "100%" }} type="primary">
                        댓글 달기
                    </Button>
                </Col>
            </Row>
        </Form.Item>
    </>
);

function alarmCalculate(date) {
    const cur_date = new Date();
    const time_val = cur_date.getTime() - Date.parse(date)
    const min = 60000
    const hour = 3600000
    const day = 86400000
    const week = day * 7
    const month = day * 30
    const year = day * 365

    if (time_val < min) return '방금 전'
    else if (time_val < hour) return Math.round(time_val / min) + '분 전'
    else if (time_val < day) return Math.round(time_val / hour) + '시간 전'
    else if (time_val < week) return Math.round(time_val / day) + '일 전'
    else if (time_val < month) return Math.round(time_val / week) + '주 전'
    else if (time_val < year) return Math.round(time_val / month) + '개월 전'
    else return Math.round(time_val / year) + '년 전'
}

function getDate(isoDate) {
    const createdDate = isoDate.split(/-|T/);
    const year = createdDate[0];
    const month = parseInt(createdDate[1]).toString();
    const date = parseInt(createdDate[2]).toString();
    const time = createdDate[3].split(':');
    const hour = time[0];
    const min = time[1];

    return `${year}년 ${month}월 ${date}일  ${hour}:${min}`;
}

const RequestDetailPage = (props) => {

    const dispatch = useDispatch()

    const [repositoryInfo, setRepositoryInfo] = useState({});
    const [timeLineLoading, setTimeLineLoading] = useState(false);
    const [addList, setAddList] = useState([]);
    const [modifyList, setModifyList] = useState([]);
    const [deleteList, setDeleteList] = useState([]);
    const [layerList, setLayerList] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [requestStatus, setRequestStatus] = useState("");

    const userId = props.match.params.userId;
    const repositoryName = props.match.params.repositoryName;

    const backHome = () => {
        props.history.push('/main')
    }

    const [comments, setComments] = useState([]);
    const [commentValue, setCommentValue] = useState('');

    const handleSubmit = () => {
        if (commentValue !== "" && commentValue !== undefined) {
            dispatch(saveRequestReply(`${props.location.pathname}/reply`, { "content": commentValue }))
                .then(response => {
                    setComments([...comments, response.payload.data]);
                })
                .catch(error => {
                    console.log(error);
                })
        }

        setCommentValue("");
    }

    const handleChange = (event) => {
        setCommentValue(event.currentTarget.value);
    }

    const [dataToSimpleMap, setdataToSimpleMap] = useState([])

    useEffect(() => {

        Api.get(`/${userId}/repositories/${repositoryName}`)
            .then(response => {
                setRepositoryInfo(response.data);
            })
            .catch(error => {
                setNotFound(true);
            });

        dispatch(selectRequestInfo(props.location.pathname))
            .then(response => {
                let values = response.payload.data.values;

                setTitle(values[0].title);
                setContent(values[0].content);
                setRequestStatus(values[0].status);

                let compareResult = response.payload.data;
                console.log({ compareResult })
                setdataToSimpleMap(compareResult)
                if (compareResult.added !== undefined) {
                    setAddList(compareResult.added.map((data) => <p>{getDate(data.createdDate)} {data.name}</p>));
                }

                if (compareResult.modified !== undefined) {
                    setModifyList(compareResult.modified.map((data) => <p>{getDate(data.createdDate)} {data.name}</p>));
                }

                if (compareResult.delete !== undefined) {
                    setDeleteList(compareResult.delete.map((data) => <p>{getDate(data.createdDate)} {data.name}</p>));
                }

                if (compareResult.layer !== undefined) {
                    setLayerList(compareResult.layer.map((data) => <p>{getDate(data.createdDate)} {data.name}</p>));
                }

                if (compareResult.replies !== undefined) {
                    setComments(compareResult.replies);
                }
                setTimeLineLoading(true);
                setIsLoading(true);
            })
            .catch(error => {
                console.log(error);
                setNotFound(true);
            })

    }, []);

    const onClickMerge = () => {
        dispatch(mergeRequestData(`${props.location.pathname}/merge`))
            .then(response => {
                console.log("onClickMerge:", response);
                setRequestStatus("ACCEPTED");
            })
            .catch(error => {
                console.log("onClickMerge error:", error);
            })
    }

    const onClickDenied = () => {
        console.log("onClickDenied");
        dispatch(deniedRequestData(`${props.location.pathname}/denied`))
            .then(response => {
                console.log("onClickDenied:", response);
                setRequestStatus("DENIED");
            })
            .catch(error => {
                console.log("onClickDenied error:", error);
            })
    }

    if (isLoading) {
        return (
            <CommonLayout>
                <Row style={{ textAlign: 'center' }}>
                    <Col span={5}></Col>
                    <Col span={14}>
                        {
                            requestStatus === "ACCEPTED" && <Alert
                                message="요청 사항이 반영되었습니다!"
                                type="info"
                                style={{ marginBottom: '10px', borderRadius: '15px', fontSize: '15px' }}
                            />
                        }
                        {
                            requestStatus === "DENIED" && <Alert
                                message="요청 사항이 거부되었습니다!"
                                type="error"
                                style={{ marginBottom: '10px', borderRadius: '15px', fontSize: '15px' }}
                            />
                        }
                        <p style={{ marginTop: "30px", fontSize: "35px" }}>
                            변경사항 반영 요청
                        </p>
                        <Divider />
                        <RequestForm>
                            <Form.Item
                                label="제목"
                                name="title"
                                rules={[{ required: true, message: '요청 제목을 입력해주세요!' }]}
                                initialValue={title}
                                style={{ width: '85%' }}
                            >
                                <Input style={{ color: "black" }} disabled />
                            </Form.Item>
                            <Form.Item
                                label="내용"
                                name="content"
                                rules={[{ required: true, message: '요청 내용을 입력해주세요!' }]}
                                initialValue={content}
                                style={{ width: '85%' }}
                            >
                                <TextArea style={{ color: "black" }} rows={10} disabled />
                            </Form.Item>
                            <Form.Item>
                                {
                                    timeLineLoading && <Timeline style={{ marginLeft: "15%", width: "50%", textAlign: "left" }}>
                                        {
                                            addList.length > 0 && <Timeline.Item color="green">
                                                <p>데이터 추가</p>
                                                {addList}
                                            </Timeline.Item>
                                        }
                                        {
                                            modifyList.length > 0 && <Timeline.Item color="gold">
                                                <p>데이터 수정</p>
                                                {modifyList}
                                            </Timeline.Item>
                                        }
                                        {
                                            deleteList.length > 0 && <Timeline.Item color="red">
                                                <p>데이터 삭제</p>
                                                {deleteList}
                                            </Timeline.Item>
                                        }
                                        {
                                            layerList.length > 0 && <Timeline.Item>
                                                <p>레이어 추가</p>
                                                {layerList}
                                            </Timeline.Item>
                                        }
                                    </Timeline>
                                }
                            </Form.Item>
                            {
                                repositoryInfo.authority === "OWNER" && requestStatus === "WAITING" && <Form.Item wrapperCol={tailFormItemLayout}>
                                    <Button type="primary" onClick={onClickMerge}>
                                        반영하기
                                    </Button>
                                    <Button style={{ marginLeft: "10px" }} type="primary" onClick={onClickDenied} danger>
                                        거절하기
                                    </Button>
                                </Form.Item>
                            }
                            <div>
                                <h1 style={{ fontSize: '2rem'}}> 변경사항 살펴보기 </h1>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img src="/GreenLogo.png" alt="" style={{ width: '40px', height: '40px' }} />
                                    <h2 style={{marginTop: '3px', marginLeft: '10px', marginRight: '15px'}}> 데이터 추가 </h2>
                                    <img src="/RedLogo.png" alt="" style={{ width: '40px', height: '40px' }} />
                                    <h2 style={{marginTop: '3px', marginLeft: '10px', marginRight: '15px'}}> 데이터 삭제 </h2>
                                    <img src="/YellowLogo.png" alt="" style={{ width: '40px', height: '40px' }} />
                                    <h2 style={{marginTop: '3px', marginLeft: '10px'}}> 데이터 수정 </h2>
                                </div>
                                <SimpleMap data={dataToSimpleMap} />
                            </div>
                            {comments.length > 0 && <CommentList comments={comments} />}
                            <Comment content={<Editor onChange={handleChange} onSubmit={handleSubmit} value={commentValue} />} />

                        </RequestForm>
                    </Col>
                    <Col span={5}></Col>
                </Row>
            </CommonLayout>
        );
    } else {
        return (
            <div style={isLoading && notFound ? null : { textAlign: "center", lineHeight: "100vh", height: "100vh" }}>
                {isLoading && notFound ? <Result
                    status="404"
                    title="404"
                    subTitle="존재하지 않는 페이지입니다."
                    extra={<Button type="primary" onClick={backHome}>홈으로</Button>}
                /> : <Spin size="large" tip="Loading..." />}
            </div>
        );
    }
};

export default withRouter(RequestDetailPage);