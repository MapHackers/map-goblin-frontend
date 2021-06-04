import React, {useEffect, useState} from 'react';
import CommonLayout from "../components/Layout/CommonLayout";
import {Button, Col, Divider, Form, Input, Row, Select, Tag, Timeline} from "antd";
import CreateInfo from "../components/Repository/CreateInfo";
import RequestForm from "../components/Repository/RequestForm";
import IssueForm from "../components/Repository/IssueForm";
import {addSelectedCategory, compareRepository} from "../_actions/repository_action";
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

const CreateRequestPage = () => {

    const dispatch = useDispatch()

    const options = [{ value: 'REQUEST' }];

    const tagRender = (props) => {
        const { label, closable, onClose } = props;

        const onPreventMouseDown = event => {
            event.preventDefault();
            event.stopPropagation();
        };

        if (label === 'REQUEST'){
            return (
                <Tag
                    color='geekblue'
                    onMouseDown={onPreventMouseDown}
                    closable={closable}
                    onClose={onClose}
                    style={{ marginRight: 3 }}
                >
                    {label}
                </Tag>
            );
        }else{
            return (
                <Tag
                    color='volcano'
                    onMouseDown={onPreventMouseDown}
                    closable={closable}
                    onClose={onClose}
                    style={{ marginRight: 3 }}
                >
                    {label}
                </Tag>
            );
        }
    };

    const onChange = (value) => {
        dispatch(addSelectedCategory(value));
    }

    const [timeLineLoading, setTimeLineLoading] = useState(false);
    const compareResult = useSelector(state => state.repository.compareResult);

    let addList = []
    let modifyList = []
    let deleteList = []

    useEffect(() => {

        console.log("compareREsult:", compareResult);

        addList = compareResult.added;
        modifyList = compareResult.modified;
        deleteList = compareResult.delete;

        setTimeLineLoading(true);

    }, [])

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
                        <Row>
                            <Col span={19}>
                                <Form.Item
                                    label="제목"
                                    name="title"
                                    rules={[{ required: true, message: '요청 제목을 입력해주세요!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="내용"
                                    name="content"
                                    rules={[{ required: true, message: '요청 내용을 입력해주세요!' }]}
                                >
                                    <TextArea rows={10}/>
                                </Form.Item>
                                {
                                    timeLineLoading && <Timeline>
                                        <Timeline.Item color="green">
                                            {
                                                // eslint-disable-next-line array-callback-return
                                                addList.map(data => {
                                                    <p>{data}</p>
                                                })
                                            }
                                        </Timeline.Item>
                                    </Timeline>
                                }
                                <Form.Item wrapperCol={tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit">
                                        이슈 생성
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col flex="auto">
                                <Divider>라벨</Divider>
                                <Select
                                    mode="multiple"
                                    showArrow
                                    tagRender={tagRender}
                                    style={{ width: '100%' }}
                                    options={options}
                                    onChange={onChange}
                                    defaultValue={'REQUEST'}
                                />
                            </Col>
                        </Row>
                    </RequestForm>
                </Col>
                <Col span={5}></Col>
            </Row>
        </CommonLayout>
    );
};

export default CreateRequestPage;