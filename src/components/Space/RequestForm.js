import React from 'react';
import {Form} from "antd";
import {withRouter} from "react-router-dom";
import {createRequest} from "../../_actions/space_action";
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

const RequestForm = (props) => {

    const dispatch = useDispatch()

    const onFinish = (values) => {
        console.log("values", values);
        const compareResult = props.initialValue;

        console.log("compareResult", compareResult);

        if(Object.keys(compareResult).length === 0){
            alert("변경 사항이 없습니다.");
        }else{
            compareResult.values = [{"title": values.title}, {"content": values.content}];

            console.log("compareResult", compareResult);

            dispatch(createRequest(props.location.pathname, compareResult))
                .then(response => {
                    props.history.push({pathname:`${props.location.pathname}/${response.payload.data.requestId}`,
                    state: {userId: props.userId, spaceName: props.spaceName}});
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

export default withRouter(RequestForm);