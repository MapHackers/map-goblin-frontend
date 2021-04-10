import React from 'react'
import { Formik } from 'formik'
import { Form, Input, Button } from 'antd'
import * as Yup from 'yup'
import axios from 'axios'

function FindPasswordForm() {
    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    id: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('유효하지 않은 이메일 입니다.')
                        .required('이메일은 필수 항목입니다.'),
                    id: Yup.string()
                        .required('아이디는 필수 항목입니다.'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {

                        let dataToSubmit = {
                            userId: values.id,
                            email: values.email
                        }
                        
                        axios.post('/api/find', dataToSubmit)
                        .then(response => {
                            console.log(response)
                        })
                        .catch(err => {
                            console.log(err)
                        })

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
                                    type='id'
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

                            <Form.Item required>
                                <Input
                                    id='email'
                                    placeholder="이메일"
                                    type='email'
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

                            <Form.Item>
                                <Button type="primary" htmlType="submit" size="large" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                                    비밀번호 찾기
                                </Button>
                            </Form.Item>
                        </form>
                    )
                }
                }
            </Formik>
        </div>
    )
}

export default FindPasswordForm
