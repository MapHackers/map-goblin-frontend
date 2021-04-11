import React from 'react'
import {
    Form,
    Input,
    Button,
} from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
import { registerUser } from '../../redux/_actions/user_action'
import { withRouter } from 'react-router-dom';

function RegisterForm(props) {
    const dispatch = useDispatch()

    return (
        <div>
            <Formik
                initialValues={{
                    id: '',
                    password: '',
                    confirmPassword: '',
                    name: '',
                    email: '',
                }}
                validationSchema={Yup.object().shape({
                    id: Yup.string()
                        .required('아이디는 필수 항목입니다.'),
                    email: Yup.string()
                        .email('유효하지 않은 이메일 입니다.')
                        .required('이메일은 필수 항목입니다.'),
                    password: Yup.string()
                        .min(6, '비밀번호는 6자리 이상이어야 합니다.')
                        .required('비밀번호는 필수 항목입니다.'),
                    name: Yup.string()
                        .required('이름은 필수 항목입니다.'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], '비밀번호가 다릅니다.')
                        .required('비밀번호 확인은 필수 항목입니다.')
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {

                        let dataToSubmit = {
                            userId: values.id,
                            password: values.password,
                            email: values.email,
                            name: values.name
                        };

                        dispatch(registerUser(dataToSubmit))
                            .then(response => {
                                if (response.payload.status === 200) {
                                    alert('회원가입이 완료 되었습니다. 로그인 해주세요')
                                    props.history.push('/login')
                                } else {
                                    alert(response.payload.data.message)
                                    console.log(response)
                                }
                            })
                            .catch(err => {
                                setTimeout(() => {
                                    alert("Error!")
                                }, 3000)
                            })

                        setSubmitting(false);
                    }, 500);
                }}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    } = props;
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
                                        className={
                                            errors.id && touched.id ? 'text-input error' : 'text-input'
                                        }
                                        size="large"
                                    />
                                    {errors.id && touched.id && (
                                        <div className="input-feedback">{errors.id}</div>
                                    )}
                                </Form.Item>

                                <Form.Item required label="비밀번호" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
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
                                            errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
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
                                        className={
                                            errors.name && touched.name ? 'text-input error' : 'text-input'
                                        }
                                        size="large"
                                    />
                                    {errors.name && touched.name && (
                                        <div className="input-feedback">{errors.name}</div>
                                    )}
                                </Form.Item>

                                <Form.Item required label="이메일" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                                    <Input
                                        id="email"
                                        placeholder="이메일"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.email && touched.email ? 'text-input error' : 'text-input'
                                        }
                                        size="large"
                                    />
                                    {errors.email && touched.email && (
                                        <div className="input-feedback">{errors.email}</div>
                                    )}
                                </Form.Item>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit" size="large" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                                        회원 가입
                                    </Button>
                                </Form.Item>
                            </form>
                        </div>
                    );
                }}
            </Formik>

        </div>
    )
}

export default withRouter(RegisterForm)
