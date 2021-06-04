import React, {useEffect, useState} from 'react';
import CommonLayout from "../components/Layout/CommonLayout";
import {Button, Col, Divider, Form, Input, Result, Row, Spin, Timeline} from "antd";
import RequestForm from "../components/Repository/RequestForm";
import {useDispatch, useSelector} from "react-redux";
import {selectRequestInfo} from "../_actions/repository_action";
import {withRouter} from "react-router-dom";
import Api from "../util/Api";

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

    const userId = props.match.params.userId;
    const repositoryName = props.match.params.repositoryName;

    const backHome = () => {
        props.history.push('/main')
    }

    useEffect(() => {

        console.log("Request Detail props:", props);

        Api.get(`/${userId}/repositories/${repositoryName}`)
            .then(response => {
                setRepositoryInfo(response.data);
            })
            .catch(error => {
                setNotFound(true);
            });

        dispatch(selectRequestInfo(props.location.pathname))
            .then(response => {
                console.log("response:", response);
                let values = response.payload.data.values;
                console.log("values", values);

                setTitle(values[0].title);
                setContent(values[0].content);

                let compareResult = response.payload.data;

                if(compareResult.added !== undefined){
                    setAddList(compareResult.added.map((data) => <p>{data.createdDate} {data.name}</p>));
                }

                if(compareResult.modified !== undefined){
                    setModifyList(compareResult.modified.map((data) => <p>{data.createdDate} {data.name}</p>));
                }

                if(compareResult.delete !== undefined){
                    setDeleteList(compareResult.delete.map((data) => <p>{data.createdDate} {data.name}</p>));
                }

                if(compareResult.layer !== undefined){
                    setLayerList(compareResult.layer.map((data) => <p>{data.createdDate} {data.name}</p>));
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
        console.log("onClickMerge");
    }

    const onClickDenied = () => {
        console.log("onClickDenied");
    }

    if(isLoading){
        return (
            <CommonLayout>
                <Row style={{textAlign:'center'}}>
                    <Col span={5}></Col>
                    <Col span={14}>
                        <p style={{marginTop:"30px", fontSize:"35px"}}>
                            변경사항 반영 요청
                        </p>
                        <Divider />
                        <RequestForm>
                            <Form.Item
                                label="제목"
                                name="title"
                                rules={[{ required: true, message: '요청 제목을 입력해주세요!' }]}
                                initialValue={title}
                                style={{width: '85%'}}
                            >
                                <Input style={{color: "black"}} disabled/>
                            </Form.Item>
                            <Form.Item
                                label="내용"
                                name="content"
                                rules={[{ required: true, message: '요청 내용을 입력해주세요!' }]}
                                initialValue={content}
                                style={{width: '85%'}}
                            >
                                <TextArea style={{color: "black"}} rows={10} disabled/>
                            </Form.Item>
                            <Form.Item>
                                {
                                    timeLineLoading && <Timeline style={{marginLeft: "15%", width: "50%", textAlign: "left"}}>
                                        {
                                            addList.length > 0 && <Timeline.Item color="green">
                                                <p>데이터 추가</p>
                                                {addList}
                                            </Timeline.Item>
                                        }
                                        {
                                            modifyList.length > 0 && <Timeline.Item>
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
                                            layerList.length > 0 && <Timeline.Item color="grey">
                                                <p>레이어 추가</p>
                                                {layerList}
                                            </Timeline.Item>
                                        }
                                    </Timeline>
                                }
                            </Form.Item>
                            {
                                repositoryInfo.authority === "OWNER" && <Form.Item wrapperCol={tailFormItemLayout}>
                                    <Button type="primary" onClick={onClickMerge}>
                                        반영하기
                                    </Button>
                                    <Button style={{marginLeft: "10px"}} type="primary" onClick={onClickDenied} danger>
                                        거절하기
                                    </Button>
                                </Form.Item>
                            }

                        </RequestForm>
                    </Col>
                    <Col span={5}></Col>
                </Row>
            </CommonLayout>
        );
    }else{
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