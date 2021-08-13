import React, { useState } from 'react';
import { Formik } from 'formik';
import { Form, Input, Button, Checkbox } from 'antd';
import * as Yup from 'yup';
import { Link, useHistory, withRouter } from 'react-router-dom';

import { userLoginAPI } from '../../util/api/user';

function LoginForm(props) {
  const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialId = localStorage.getItem('rememberMe') ? localStorage.getItem('rememberMe') : '';

  const history = useHistory();
  return (
    <div>
      <Formik
        initialValues={{
          id: initialId,
          password: '',
        }}
        validationSchema={Yup.object().shape({
          id: Yup.string().required('아이디를 입력해 주세요'),
          password: Yup.string()
            .min(6, '비밀번호는 6자리 이상입니다.')
            .required('Password is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            let dataToSubmit = {
              userId: values.id,
              password: values.password,
            };

            try {
              const response = await userLoginAPI(dataToSubmit);

              window.localStorage.setItem('userToken', response.data.token);
              const userToken = window.localStorage.getItem('userToken');
              console.log({ userToken });

              if (rememberMe === true) {
                window.localStorage.setItem('rememberMe', values.id);
              } else {
                localStorage.removeItem('rememberMe');
              }

              history.push('/main');
            } catch (e) {
              alert('아이디 또는 비밀번호를 확인해 주세요');
              console.log(e);
            }
            values.password = '';
            setSubmitting(false);
          }, 500);
        }}
      >
        {(props) => {
          const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } =
            props;
          return (
            <form onSubmit={handleSubmit}>
              <Form.Item required>
                <Input
                  id="id"
                  placeholder="아이디"
                  type="text"
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.id && touched.id ? 'text-input error' : 'text-input'}
                  size="large"
                />
                {errors.id && touched.id && <div className="input-feedback">{errors.email}</div>}
              </Form.Item>

              <Form.Item required>
                <Input
                  id="password"
                  placeholder="비밀번호"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                  size="large"
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>
              <Form.Item>
                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe}>
                  {' '}
                  아이디 기억하기{' '}
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="login-form-button"
                    style={{ minWidth: '100%' }}
                    disabled={isSubmitting}
                    onSubmit={handleSubmit}
                  >
                    로그인
                  </Button>
                </div>
              </Form.Item>

              <Form.Item>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Link to="/findId" style={{ marginLeft: '3rem' }}>
                    {' '}
                    아이디 찾기{' '}
                  </Link>
                  <Link to="/findPassword"> 비밀번호 찾기 </Link>
                  <Link to="/register" style={{ marginRight: '3rem' }}>
                    {' '}
                    회원가입{' '}
                  </Link>
                </div>
              </Form.Item>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default withRouter(LoginForm);
