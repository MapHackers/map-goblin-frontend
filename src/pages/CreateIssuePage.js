import React from 'react';
import {Button, Col, Divider, Form, Input, Row} from "antd";
import CommonLayout from "../components/Layout/CommonLayout";
import IssueForm from "../components/Space/IssueForm";

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
                                    <Button type="primary" htmlType="submit" >
                                        이슈 생성
                                    </Button>
                                </Form.Item>
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