import React, { useState } from 'react'
import { Formik } from 'formik'
import { Form, Input, Button, Checkbox } from 'antd'
import * as Yup from 'yup'

function LoginForm() {
    const rememberMeChecked = false

    const [rememberMe, setRememberMe] = useState(rememberMeChecked)

    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
    }

    return (
        <div>
            <Formik
                initialValues={{
                    id: '',
                    password: ''
                }}
                validationSchema={Yup.object().shape({
                    id: Yup.string()
                        .required('아이디를 입력해 주세요'),
                    password: Yup.string()
                        .min(6, '비밀번호는 6자리 이상입니다.')
                        .required('Password is required')
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
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
                    } = props
                    return (
                        <form onSubmit={handleSubmit}>
                            <Form.Item required>
                                <Input
                                    id='id'
                                    placeholder="아이디"
                                    type='text'
                                    value={values.id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.id && touched.id ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.id && touched.id && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}
                            </Form.Item>

                            <Form.Item required>
                                <Input
                                    id='password'
                                    placeholder="비밀번호"
                                    type='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}
                            </Form.Item>

                            <Form.Item>
                                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe}> 아이디 기억하기 </Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <div>
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                                        로그인
                                    </Button>
                                </div>
                            </Form.Item>

                            <Form.Item>
                                <a href="/findId"> 아이디 찾기 </a>
                                <a href="/findPassword"> 비밀번호 찾기 </a>
                                <a href="/register"> 회원가입 </a>
                            </Form.Item>
                        </form>
                    )
                }
                }

            </Formik>
        </div>
    )
}

export default LoginForm
