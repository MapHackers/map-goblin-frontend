import React from 'react';
import {Form} from "antd";
import {withRouter} from "react-router-dom";
import {createRequest} from "../../_actions/repository_action";
import {useDispatch} from "react-redux";

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

const IssueForm = (props) => {

    const dispatch = useDispatch()

    const onFinish = (values) => {
        const compareResult = props.initialValue;

        if(Object.keys(compareResult).length === 0){
            alert("변경 사항이 없습니다.");
        }else{
            let jsonObj = {}
            jsonObj.values = [{"title": values.title}, {"content": values.content}];
            Object.assign(jsonObj, props.initialValue);

            dispatch(createRequest(props.location.pathname, jsonObj))
                .then(response => {
                    props.history.push(`${props.location.pathname}/${response.payload.data.requestId}`);
                })
                .catch(error => {
                    console.log(error);
                })
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
        >

            {props.children}

        </Form>
    );
};

export default withRouter(IssueForm);