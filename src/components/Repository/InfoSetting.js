import React, {useEffect, useState} from 'react';
import {Button, Col, Input, Row} from "antd";
import ImgUpload from "./ImgUpload";
import {withRouter} from "react-router-dom";
import CreateForm from "./CreateForm";
import CreateFormItem from "./CreateFormItem";
import SelectCategory from "./SelectCategory";
import {useDispatch, useSelector} from "react-redux";
import {addFile, modifiedFile} from "../../_actions/repository_action";

const { TextArea } = Input;

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 10,
            offset: 5,
        },
        sm: {
            span: 20,
            offset: 19,
        },
    },
};

const deleteItemLayout = {
    wrapperCol: {
        xs: {
            span: 10,
            offset: 5,
        },
        sm: {
            span: 12,
            offset: 8,
        },
    },
};

const InfoSetting = (props) => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const repository = useSelector(state => state.repository);

    useEffect(()=>{
        let newFileList = [{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: props.thumbnailUrl,
        }];

        dispatch(addFile(newFileList));

        dispatch(modifiedFile(false));
    }, [])

    const onClick = () => {
        console.log("onclick")
    }

    return (
        <Row style={{textAlign:'center'}}>
            <Col span={5}></Col>
            <Col span={14}>
                <CreateForm formName="modify" repository={repository} user={user} repositoryInfo={props.repositoryInfo}>
                    <Row>
                        <Col span={14}>
                            <CreateFormItem label="지도 이름" name="name" >
                                <Input defaultValue={props.repositoryInfo.name} value={props.repositoryInfo.name}/>
                            </CreateFormItem>
                            <CreateFormItem label="설명" name="description">
                                <TextArea rows={10} defaultValue={props.repositoryInfo.description} value={props.repositoryInfo.description}/>
                            </CreateFormItem>
                            <CreateFormItem label="카테고리" name="categories">
                                <SelectCategory categories={props.repositoryInfo.categories}/>
                            </CreateFormItem>
                            <CreateFormItem label="Owner의 한마디" name="oneWord">
                                <TextArea showCount maxLength={20} defaultValue={props.repositoryInfo.oneWord} value={props.repositoryInfo.oneWord}/>
                            </CreateFormItem>
                            <CreateFormItem wrapperCol={tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" style={{marginTop:"20px"}}>
                                    정보 수정
                                </Button>
                            </CreateFormItem>
                        </Col>
                        <Col span={10}>
                            <CreateFormItem label="썸네일" name="thumbnail">
                                <div id="create-map-upload">
                                    <ImgUpload />
                                </div>
                            </CreateFormItem>
                            <CreateFormItem wrapperCol={deleteItemLayout}>
                                <Button type="primary" onClick={onClick} style={{marginTop:"20px", width:"100%"}} danger>
                                    지도 삭제
                                </Button>
                            </CreateFormItem>
                        </Col>
                    </Row>
                </CreateForm>
            </Col>
            <Col span={5}></Col>
        </Row>
    );
};

export default withRouter(InfoSetting);