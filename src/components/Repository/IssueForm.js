import React from 'react';
import { Form } from 'antd';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import Api from '../../util/Api';

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
  const history = useHistory();
  const location = useLocation();
  const onFinish = (values) => {
    Api.post(location.pathname, { title: values.title, content: values.content })
      .then((response) => {
        history.push(location.pathname + '/' + response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form {...formItemLayout} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      {props.children}
    </Form>
  );
};

export default withRouter(IssueForm);
