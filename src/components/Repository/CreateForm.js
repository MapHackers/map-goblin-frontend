import React from 'react';
import {Form} from "antd";
import {fileUpload, saveRepositoryInfo, modifyRepositoryInfo} from "../../_actions/repository_action";
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

    const selectedCategories = useSelector(state => state.repository.selectedCategory)
    const isModified = useSelector(state => state.repository.isModified)

    const onFinish = (values) => {

        if(values.name === undefined) values.name = props.repositoryInfo.name;
        if(values.description === undefined) values.description = props.repositoryInfo.description;
        if(values.thumbnail === undefined) values.thumbnail = props.repositoryInfo.thumbnail;
        if(values.oneWord === undefined) values.oneWord = props.repositoryInfo.oneWord;
        if(values.categories === undefined) values.categories = selectedCategories;

        const formData = new FormData();

        if (props.repository.fileList.length > 0 && isModified === true) {
            formData.append('file', props.repository.fileList[0].originFileObj);
            dispatch(fileUpload(formData))
                .then(response => {
                    const payload = response.payload;

                    values.thumbnail = payload.data;

                    if (props.formName === "modify"){
                        dispatch(modifyRepositoryInfo(values, props.user.userId, props.repositoryInfo.name))
                            .then(response => {
                                props.history.push(`/${props.user.userId}/repositories/${values.name}`);
                            })
                    }else{
                        dispatch(saveRepositoryInfo(values))
                            .then(response => {
                                const payload = response.payload;

                                props.history.push(`/${props.user.userId}/repositories/${payload.data.name}`);
                            })
                    }
                });
        }else{
            if(props.formName === "modify"){

                dispatch(modifyRepositoryInfo(values, props.user.userId, props.repositoryInfo.name))
                    .then(response => {
                        props.history.push(`/${props.user.userId}/repositories/${values.name}`);
                    });
            }else{
                dispatch(saveRepositoryInfo(values))
                    .then(response => {
                        props.history.push(`/${props.user.userId}/repositories/${response.data.name}`);
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
              initialValues={{ remember: true }}>

            {props.children}

        </Form>
    );
};

export default withRouter(CreateForm);