import React from 'react';
import {Form} from "antd";
import {fileUpload, saveSpaceInfo, modifySpaceInfo, modifiedFile} from "../../_actions/space_action";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";

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

const CreateForm = (props) => {
    const dispatch = useDispatch()

    const selectedCategories = useSelector(state => state.space.selectedCategory)
    const isModified = useSelector(state => state.space.isModified)

    const onFinish = (values) => {

        values.categories = selectedCategories;

        const formData = new FormData();

        if(isModified === true){
            if(props.space.fileList.length > 0){
                formData.append('file', props.space.fileList[0].originFileObj);
                dispatch(fileUpload(formData))
                    .then(response => {
                        const payload = response.payload;

                        values.thumbnail = payload.data;

                        if (props.formName === "modify"){
                            dispatch(modifySpaceInfo(values, props.user.userId, props.spaceInfo.name))
                                .then(response => {
                                    props.history.push(`/${props.user.userId}/spaces/${values.name}`);
                                    window.location.reload();
                                })
                        }else{
                            dispatch(saveSpaceInfo(values))
                                .then(response => {
                                    const payload = response.payload;

                                    props.history.push(`/${props.user.userId}/spaces/${payload.data.name}`);
                                })
                        }
                    });
            }else{
                if(props.formName === "modify"){

                    values.thumbnail = null;

                    dispatch(modifySpaceInfo(values, props.user.userId, props.spaceInfo.name))
                        .then(response => {
                            props.history.push(`/${props.user.userId}/spaces/${values.name}`);
                            window.location.reload();
                        });
                }else{
                    dispatch(saveSpaceInfo(values))
                        .then(response => {
                            const payload = response.payload;
                            props.history.push(`/${props.user.userId}/spaces/${payload.data.name}`);
                        });
                }
            }

            dispatch(modifiedFile(false));
        }else{
            if(props.formName === "modify"){

                console.log("values",values);

                dispatch(modifySpaceInfo(values, props.user.userId, props.spaceInfo.name))
                    .then(response => {
                        props.history.push(`/${props.user.userId}/spaces/${values.name}`);
                    });
            }else{
                dispatch(saveSpaceInfo(values))
                    .then(response => {
                        const payload = response.payload;
                        props.history.push(`/${props.user.userId}/spaces/${payload.data.name}`);
                    });
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form {...formItemLayout}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={props.initialValues}>

            {props.children}

        </Form>
    );
};

export default withRouter(CreateForm);