import React from 'react';
import {Form} from "antd";

const CreateFormItem = (props) => {

    return (
        <Form.Item
            label={props.label}
            name={props.name}
            rules={props.rules}
            style={props.style}
            {...props.wrapperCol}
        >
            {props.children}
        </Form.Item>
    );
};

export default CreateFormItem;