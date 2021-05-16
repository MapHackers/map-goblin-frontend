import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, Select, Tag} from "antd";
import ImgUpload from "./ImgUpload";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addFile, fileUpload, saveRepositoryInfo} from "../../_actions/repository_action";
import CreateForm from "./CreateForm";
import CreateFormItem from "./CreateFormItem";
import SelectCategory from "./SelectCategory";

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
            span: 18,
            offset: 10,
        },
        sm: {
            span: 15,
            offset: 9,
        },
    },
};

const CreateInfo = (props) => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const repository = useSelector(state => state.repository);

    useEffect(()=>{
        let newFileList = [];

        dispatch(addFile(newFileList));
    }, [])

    // console.log("&&&&&&&&&&&&&&&&&&&&&&&&")
    // console.log(props.repositoryInfo)
    // console.log(props.thumbnailUrl)
    //
    // const dispatch = useDispatch()
    //
    // const user = useSelector(state => state.user);
    // const repository = useSelector(state => state.repository);
    //
    // const onFinish = (values) => {
    //
    //     const formData = new FormData();
    //
    //     if (repository.fileList.length > 0) {
    //         formData.append('file', repository.fileList[0].originFileObj);
    //         dispatch(fileUpload(formData))
    //             .then(response => {
    //                 const payload = response.payload;
    //
    //                 values.thumbnail = payload.data;
    //                 dispatch(saveRepositoryInfo(values))
    //                     .then(response => {
    //                         const payload = response.payload;
    //
    //                         props.history.push(`/${user.userId}/repositories/${payload.data.name}`);
    //                     })
    //             });
    //     }else{
    //         dispatch(saveRepositoryInfo(values))
    //             .then(response => {
    //                 props.history.push(`/${user.userId}/repositories/${response.data.name}`);
    //             });
    //     }
    // };
    //
    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };
    //
    // const options = [{ value: '대학교' }, { value: '맛집' }, { value: '정보전달' }, { value: '서울' }];
    //
    // const tagRender = (props) => {
    //     const { label, closable, onClose } = props;
    //     const onPreventMouseDown = event => {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     };
    //     return (
    //         <Tag
    //             color='geekblue'
    //             onMouseDown={onPreventMouseDown}
    //             closable={closable}
    //             onClose={onClose}
    //             style={{ marginRight: 3 }}
    //         >
    //             {label}
    //         </Tag>
    //     );
    // };

    return (
        <CreateForm formName="create" repository={repository} user={user}>
            <CreateFormItem label="썸네일" name="thumbnail" style={{width:"50%", marginLeft:"25%"}}>
                <div id="create-map-upload">
                    <ImgUpload />
                </div>
            </CreateFormItem>
            <CreateFormItem label="지도 이름" name="name" rules={[{ required: true, message: '지도 이름을 입력해주세요!' }]} style={{width:"50%", marginLeft:"25%"}}>
                <Input />
            </CreateFormItem>
            <CreateFormItem label="설명" name="description" style={{width:"50%", marginLeft:"25%"}}>
                <TextArea rows={5}/>
            </CreateFormItem>
            <CreateFormItem label="카테고리" name="categories" style={{width:"50%", marginLeft:"25%"}}>
                <SelectCategory />
            </CreateFormItem>
            <CreateFormItem wrapperCol={tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    지도 생성
                </Button>
            </CreateFormItem>
        </CreateForm>
        // <Form {...formItemLayout}
        //       name="basic"
        //       onFinish={onFinish}
        //       onFinishFailed={onFinishFailed}
        //       initialValues={{ remember: true }}>
        //
        //     <Form.Item
        //         label="썸네일"
        //         name="thumbnail"
        //         style={{width:"50%", marginLeft:"25%"}}>
        //         <div id="create-map-upload">
        //             <ImgUpload thumbnailUrl={props.thumbnailUrl}/>
        //         </div>
        //     </Form.Item>
        //
        //     <Form.Item
        //         label="지도 이름"
        //         name="name"
        //         rules={[{ required: true, message: '지도 이름을 입력해주세요!' }]}
        //         style={{width:"50%", marginLeft:"25%"}}
        //     >
        //         <Input />
        //     </Form.Item>
        //
        //     <Form.Item
        //         label="설명"
        //         name="description"
        //         style={{width:"50%", marginLeft:"25%"}}
        //     >
        //         <TextArea />
        //     </Form.Item>
        //
        //     <Form.Item
        //         label="카테고리"
        //         name="categories"
        //         style={{width:"50%", marginLeft:"25%"}}
        //     >
        //         <Select
        //             mode="multiple"
        //             showArrow
        //             tagRender={tagRender}
        //             style={{ width: '100%' }}
        //             options={options}
        //         />
        //     </Form.Item>
        //
        //     <Form.Item {...tailFormItemLayout}>
        //         <Button type="primary" htmlType="submit">
        //             지도 생성
        //         </Button>
        //     </Form.Item>
        // </Form>
    );
};

export default withRouter(CreateInfo);