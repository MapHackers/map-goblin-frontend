import React, {useState} from 'react';
import CommonLayout from "../components/Layout/CommonLayout";

import { Row, Col, Divider } from "antd";
import { Form, Input, Button } from 'antd';
import { Upload, message, Select, Tag } from 'antd';
import ImgCrop from 'antd-img-crop';

const { TextArea } = Input;

const options = [{ value: '카테고리1' }, { value: '카테고리2' }, { value: '카테고리3' }, { value: '카테고리4' }];

function tagRender(props) {
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
}

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

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
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const CreateMyMapPage = () => {
    const [fileList, setFileList] = useState([]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        return false;
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
                    <Form {...formItemLayout} name="basic" initialValues={{ remember: true }}
                          onFinish={onFinish} onFinishFailed={onFinishFailed}>

                        <Form.Item
                            label="썸네일"
                            style={{width:"50%", marginLeft:"25%"}}>
                            <div id="create-map-upload">
                                <ImgCrop rotate>
                                        <Upload
                                            action=""
                                            listType="picture-card"
                                            fileList={fileList}
                                            onChange={onChange}
                                            onPreview={onPreview}
                                        >
                                            {fileList.length < 1 && '+ Upload'}
                                        </Upload>
                                </ImgCrop>
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="지도 이름"
                            name="mapName"
                            rules={[{ required: true, message: '지도 이름을 입력해주세요!' }]}
                            style={{width:"50%", marginLeft:"25%"}}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="설명"
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
                                Submit
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