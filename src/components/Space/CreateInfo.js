import React, {useEffect} from 'react';
import {Button, Input} from "antd";
import ImgUpload from "./ImgUpload";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addFile} from "../../_actions/space_action";
import CreateForm from "./CreateForm";
import CreateFormItem from "./CreateFormItem";
import SelectCategory from "./SelectCategory";

const { TextArea } = Input;

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
    const space = useSelector(state => state.space);

    useEffect(()=>{
        let newFileList = [];

        dispatch(addFile(newFileList));
    }, []);

    return (
        <CreateForm formName="create" space={space} user={user}>
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
    );
};

export default withRouter(CreateInfo);