import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../_actions/user_action';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';

function RegisterForm(props) {
  const dispatch = useDispatch();
  const [submitEmail, setsubmitEmail] = useState(false);
  const history = useHistory();
  const handleEmailAuth = (email, id) => {
    axios
      .post(`/api/find`, { email: email, userId: id })
      .then((response) => {
        alert('해당 이메일로 이미 가입된 아이디가 있습니다.');
      })
      .catch((err) => {
        setsubmitEmail(true);
        alert('가입한 이메일을 확인하여 코드를 입력해 주세요.');
        axios.post(`/api/email`, { email: email });
      });
  };
  const [codeCheck, setcodeCheck] = useState(false);
  const handleCodeAuth = (email, code) => {
    console.log('email', email, 'code', code);
    axios
      .post(`/api/checkNumber`, { email: email, code: code })
      .then((response) => {
        if (response.status === 200) {
          alert('이메일 인증 완료!');
          setsubmitEmail(false);
          setcodeCheck(true);
          console.log({ codeCheck });
        }
      })
      .catch((err) => {
        alert('잘못된 인증번호입니다.');
      });
  };

  return (
    <div>
      <Formik
        initialValues={{
          id: '',
          password: '',
          confirmPassword: '',
          name: '',
          email: '',
          code: '',
        }}
        validationSchema={Yup.object().shape({
          id: Yup.string().required('아이디는 필수 항목입니다.'),
          email: Yup.string()
            .email('유효하지 않은 이메일 입니다.')
            .required('이메일은 필수 항목입니다.'),
          password: Yup.string()
            .min(6, '비밀번호는 6자리 이상이어야 합니다.')
            .required('비밀번호는 필수 항목입니다.'),
          name: Yup.string().required('이름은 필수 항목입니다.'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], '비밀번호가 다릅니다.')
            .required('비밀번호 확인은 필수 항목입니다.'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (!codeCheck) {
            alert('이메일 코드를 확인해 주세요!');
            console.log({ codeCheck });
            setSubmitting(false);
            return;
          } else {
            setTimeout(() => {
              let dataToSubmit = {
                userId: values.id,
                password: values.password,
                email: values.email,
                name: values.name,
              };

              dispatch(registerUser(dataToSubmit))
                .then((response) => {
                  if (response.payload.status === 200) {
                    alert('회원가입이 완료 되었습니다. 로그인 해주세요');
                    history.push('/login');
                  } else {
                    alert(response.payload.data.message);
                    console.log(response);
                  }
                })
                .catch((err) => {
                  setTimeout(() => {
                    alert('Error!');
                  }, 3000);
                });

              setSubmitting(false);
            }, 500);
          }
        }}
      >
        {(props) => {
          const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } =
            props;
          return (
            <div>
              <form onSubmit={handleSubmit}>
                <Form.Item required label="아이디">
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
                  {errors.id && touched.id && <div className="input-feedback">{errors.id}</div>}
                </Form.Item>

                <Form.Item
                  required
                  label="비밀번호"
                  validateStatus={errors.password && touched.password ? 'error' : 'success'}
                >
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

                <Form.Item required label="비밀번호 확인" hasFeedback>
                  <Input
                    id="confirmPassword"
                    placeholder="비밀번호 확인"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? 'text-input error'
                        : 'text-input'
                    }
                    size="large"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="input-feedback">{errors.confirmPassword}</div>
                  )}
                </Form.Item>

                <Form.Item required label="이름">
                  <Input
                    id="name"
                    placeholder="이름"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.name && touched.name ? 'text-input error' : 'text-input'}
                    size="large"
                  />
                  {errors.name && touched.name && (
                    <div className="input-feedback">{errors.name}</div>
                  )}
                </Form.Item>

                <Form.Item
                  style={{ display: 'flex' }}
                  required
                  label="이메일"
                  validateStatus={errors.email && touched.email ? 'error' : 'success'}
                >
                  <Input
                    id="email"
                    placeholder="이메일"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email ? 'text-input error' : 'text-input'}
                    size="large"
                    style={{ width: '76%' }}
                  />

                  <Button
                    type="primary"
                    onClick={() => {
                      handleEmailAuth(values.email);
                    }}
                    size="large"
                  >
                    이메일 인증
                  </Button>

                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}
                </Form.Item>
                {submitEmail ? (
                  <Form.Item style={{ display: 'flex' }} required label="코드">
                    <Input
                      id="code"
                      placeholder="이메일"
                      value={values.code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      size="large"
                      style={{ width: '76%' }}
                    />

                    <Button
                      type="primary"
                      onClick={() => {
                        handleCodeAuth(values.email, values.code);
                      }}
                      size="large"
                    >
                      코드 확인
                    </Button>
                  </Form.Item>
                ) : (
                  <></>
                )}

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
                    회원 가입
                  </Button>
                </Form.Item>
              </form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default withRouter(RegisterForm);
