import React, {useState} from 'react';
import CommonLayout from "../components/Layout/CommonLayout";

import { Row, Col, Divider } from "antd";
import { Form, Input, Button } from 'antd';
import { Upload, message, Select, Tag } from 'antd';
import ImgCrop from 'antd-img-crop';

import Api from "../util/Api";
import {Router} from "@material-ui/icons";

const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs: { span: 10 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 10 },
        sm: { span: 18 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 0,
            offset: 1,
        },
        sm: {
            span: 13,
            offset: 10,
        },
    },
};

const CreateMyMapPage = (props) => {
    const [fileList, setFileList] = useState([]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);

    };

    const onFinish = (values) => {

        const formData = new FormData();
        let imgName = "";

        if (fileList.length > 0) {
            formData.append('file', fileList[0].originFileObj);

            Api.post('/files', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(response => {
                imgName = response.data;
            });
        }

        values.thumbnail = imgName;

        Api.post('/repositories', values).then(response=>{
            const userId = props.user.userData.data.userId;
            const repositoryName = response.data.name;

            props.history.push('/'+userId+'/repositories/'+repositoryName);
        }).catch(error=>{
            alert(error.response.data.message);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    const options = [{ value: '카테고리1' }, { value: '카테고리2' }, { value: '카테고리3' }, { value: '카테고리4' }];

    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = event => {
            event.preventDefault();
            event.stopPropagation();
        };
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
    };

    return (
        <CommonLayout>
            <Row style={{textAlign:'center'}}>
                <Col span={5}></Col>
                <Col span={14}>
                    <p style={{marginTop:"30px", fontSize:"35px"}}>
                        나만의 지도를 만들어 보아요!
                    </p>
                    <p style={{marginTop:"30px", fontSize:"25px"}}>
                        지도의 이름과 카테고리를<br/>입력해주세요.
                    </p>
                    <Divider />
                    <Form {...formItemLayout}
                          name="basic"
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          initialValues={{ remember: true }}>

                        <Form.Item
                            label="썸네일"
                            name="thumbnail"
                            style={{width:"50%", marginLeft:"25%"}}>
                            <div id="create-map-upload">
                                <ImgCrop rotate>
                                        <Upload
                                            listType="picture-card"
                                            fileList={fileList}
                                            onChange={onChange}
                                            onPreview={onPreview}
                                            beforeUpload={file => {
                                                setFileList(fileList.concat(file));
                                                return false;
                                            }}
                                        >
                                            {fileList.length < 1 && '+ Upload'}
                                        </Upload>
                                </ImgCrop>
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="지도 이름"
                            name="name"
                            rules={[{ required: true, message: '지도 이름을 입력해주세요!' }]}
                            style={{width:"50%", marginLeft:"25%"}}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="설명"
                            name="description"
                            style={{width:"50%", marginLeft:"25%"}}
                        >
                            <TextArea />
                        </Form.Item>

                        <Form.Item
                            label="카테고리"
                            name="categories"
                            style={{width:"50%", marginLeft:"25%"}}
                        >
                            <Select
                                mode="multiple"
                                showArrow
                                tagRender={tagRender}
                                style={{ width: '100%' }}
                                options={options}
                            />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                지도 생성
                            </Button>
                        </Form.Item>

                    </Form>
                </Col>
                <Col span={5}></Col>
            </Row>
        </CommonLayout>
    );
};

export default CreateMyMapPage;