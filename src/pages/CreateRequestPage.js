import React, {useEffect, useState} from 'react';
import CommonLayout from "../components/Layout/CommonLayout";
import {Button, Col, Divider, Form, Input, Row, Timeline} from "antd";
import RequestForm from "../components/Space/RequestForm";
import {comparespace} from "../_actions/space_action";
import {useDispatch, useSelector} from "react-redux";

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

const CreateRequestPage = (props) => {

    const dispatch = useDispatch()

    const [timeLineLoading, setTimeLineLoading] = useState(false);
    const [addList, setAddList] = useState([]);
    const [modifyList, setModifyList] = useState([]);
    const [deleteList, setDeleteList] = useState([]);
    const [layerList, setLayerList] = useState([]);
    const compareResult = useSelector(state => state.space.compareResult);

    let userId;
    let spaceName;

    useEffect(() => {
        if(Object.keys(compareResult).length === 0 && props.location.state !== undefined){
            userId = props.location.state.userId;
            spaceName = props.location.state.spaceName;

            dispatch(comparespace(userId, spaceName))
                .then(response => {
                })
                .catch(error => {
                    console.log(error);
                })
        }

        if(compareResult.added !== undefined){
            setAddList(compareResult.added.map((data) => <p>{getDate(data.createdDate)} {data.name}</p>));
        }

        if(compareResult.modified !== undefined){
            setModifyList(compareResult.modified.map((data) => <p>{getDate(data.createdDate)} {data.name}</p>));
        }

        if(compareResult.delete !== undefined){
            setDeleteList(compareResult.delete.map((data) => <p>{getDate(data.createdDate)} {data.name}</p>));
        }

        if(compareResult.layer !== undefined){
            setLayerList(compareResult.layer.map((data) => <p>{getDate(data.createdDate)} {data.name}</p>));
        }

        setTimeLineLoading(true);

    }, [compareResult])

    return (
        <CommonLayout>
            <Row style={{textAlign:'center'}}>
                <Col span={5}></Col>
                <Col span={14}>
                    <p style={{marginTop:"30px", fontSize:"35px"}}>
                        변경사항 반영 요청
                    </p>
                    <Divider />
                    <RequestForm initialValue={compareResult} userId={userId} spaceName={spaceName}>
                        <Form.Item
                            label="제목"
                            name="title"
                            rules={[{ required: true, message: '요청 제목을 입력해주세요!' }]}
                            style={{width: '85%'}}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="내용"
                            name="content"
                            rules={[{ required: true, message: '요청 내용을 입력해주세요!' }]}
                            style={{width: '85%'}}
                        >
                            <TextArea rows={10}/>
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
                        <Form.Item wrapperCol={tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                변경 요청
                            </Button>
                        </Form.Item>
                    </RequestForm>
                </Col>
                <Col span={5}></Col>
            </Row>
        </CommonLayout>
    );
};

export default CreateRequestPage;