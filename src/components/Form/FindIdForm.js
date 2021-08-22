import React from 'react';
import { Formik } from 'formik';
import { Form, Input, Button } from 'antd';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory, withRouter } from 'react-router-dom';

function FindIDForm(props) {
  const history = useHistory();
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('유효하지 않은 이메일 입니다.')
            .required('이메일은 필수 항목입니다.'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let dataToSubmit = {
              email: values.email,
            };

            axios
              .post('/api/find', dataToSubmit)
              .then((response) => {
                if (response.status === 200) {
                  alert(`해당 이메일로 가입된 아이디는 ${response.data.data} 입니다.`);
                }
                history.push(`/login`);
              })
              .catch((err) => {
                alert('해당 이메일로 가입된 아이디가 없습니다.');
              });
            values.email = '';
            setSubmitting(false);
          }, 400);
        }}
      >
        {(props) => {
          const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } =
            props;
          return (
            <form onSubmit={handleSubmit}>
              <Form.Item required>
                <Input
                  id="email"
                  placeholder="이메일"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? 'text-input error' : 'text-input'}
                  size="large"
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="login-form-button"
                  style={{ minWidth: '100%' }}
                  disabled={isSubmitting}
                  onSubmit={handleSubmit}
                >
                  아이디 찾기
                </Button>
              </Form.Item>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default withRouter(FindIDForm);
