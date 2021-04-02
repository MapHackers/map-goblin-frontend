import React from 'react'
import { Formik } from 'formik'
import { Form, Input, Button } from 'antd'
import * as Yup from 'yup'

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 4,
        },
    },
};

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
                                    type='id'
                                    value={values.id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.id && touched.id ? 'text-input error' : 'text-input'
                                    }
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
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
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
