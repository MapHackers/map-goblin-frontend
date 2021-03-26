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
            offset: 8,
        },
    },
};

function FindIDForm() {
    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('유효하지 않은 이메일 입니다.')
                        .required('이메일은 필수 항목입니다.')
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
                                    회원 가입
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

export default FindIDForm
