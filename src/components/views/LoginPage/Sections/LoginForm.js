import React, { useState } from 'react'
import { Formik } from 'formik'
import { Form, Input, Button, Checkbox } from 'antd'
import * as Yup from 'yup'
import { withRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux'
import { loginUser } from '../../../../redux/_actions/user_action'

function LoginForm(props) {
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false

    const [rememberMe, setRememberMe] = useState(rememberMeChecked)
    const dispatch = useDispatch()

    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
    }

    const initialId = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

    return (
        <div>
            <Formik
                initialValues={{
                    id: initialId,
                    password: '',
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
                        let dataToSubmit = {
                            userId: values.id,
                            password: values.password
                        }

                        dispatch(loginUser(dataToSubmit))
                            .then(response => {
                                console.log("payload", response.payload)
                                if (response.payload.status === 200) {
                                    window.localStorage.setItem('userId', response.payload.data.userId)
                                    if (rememberMe === true) {
                                        window.localStorage.setItem('rememberMe', values.id)
                                    } else {
                                        localStorage.removeItem('rememberMe')
                                    }
                                    props.history.push('/main')
                                } else {
                                    alert('아이디 또는 비밀번호를 확인해 주세요')
                                }
                            })
                            .catch(err => {
                                setTimeout(() => {
                                    alert("Error!", err)
                                }, 3000)
                            })
                        values.password = ''
                        setSubmitting(false)
                    }, 500)
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
                                    size="large"
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
                                    size="large"
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
                                    <Button type="primary" htmlType="submit" size="large" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                                        로그인
                                    </Button>
                                </div>
                            </Form.Item>

                            <Form.Item>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <a href="/findId" style={{marginLeft: '3rem'}}> 아이디 찾기 </a>
                                    <a href="/findPassword"> 비밀번호 찾기 </a>
                                    <a href="/register" style={{marginRight: '3rem'}}> 회원가입 </a>
                                </div>
                            </Form.Item>
                        </form>
                    )
                }
                }

            </Formik>
        </div>
    )
}

export default withRouter(LoginForm)
