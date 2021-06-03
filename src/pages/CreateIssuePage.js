import React, {useState} from 'react';
import {Avatar, Button, Col, Divider, Form, Input, Row, Select, Tag} from "antd";
import CreateInfo from "../components/Repository/CreateInfo";
import CommonLayout from "../components/Layout/CommonLayout";
import IssueForm from "../components/Repository/IssueForm";
import {useDispatch} from "react-redux";
import {addSelectedCategory} from "../_actions/repository_action";
import {UserOutlined} from "@ant-design/icons";

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

const CreateIssuePage = (props) => {

    const dispatch = useDispatch()

    const options = [{ value: 'QUESTION' }, { value: 'ISSUE' }];

    const tagRender = (props) => {
        const { label, closable, onClose } = props;

        const onPreventMouseDown = event => {
            event.preventDefault();
            event.stopPropagation();
        };

        if (label === 'QUESTION'){
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

    return (
        <CommonLayout>
            <Row style={{textAlign:'center'}}>
                <Col span={5}></Col>
                <Col span={14}>
                    <p style={{marginTop:"30px", fontSize:"35px"}}>
                        새로운 이슈
                    </p>
                    <Divider />
                    <IssueForm>
                        <Row>
                            <Col span={19}>
                                <Form.Item
                                    label="제목"
                                    name="title"
                                    rules={[{ required: true, message: '이슈 제목을 입력해주세요!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="내용"
                                    name="content"
                                    rules={[{ required: true, message: '이슈 내용을 입력해주세요!' }]}
                                >
                                    <TextArea rows={10}/>
                                </Form.Item>
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
                                    defaultValue={'QUESTION'}
                                />
                            </Col>
                        </Row>

                    </IssueForm>
                </Col>
                <Col span={5}></Col>
            </Row>
        </CommonLayout>
    );
};

export default CreateIssuePage;