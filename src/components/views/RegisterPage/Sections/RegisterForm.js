import React from 'react'
import {
    Form,
    Input,
    Button,
} from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
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

function RegisterForm() {
    return (
        <div>
            <Formik
                initialValues={{
                    id: '',
                    password: '',
                    confirmPassword: '',
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
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], '비밀번호가 다릅니다.')
                        .required('비밀번호 확인은 필수 항목입니다.')
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {

                        let dataToSubmit = {
                            email: values.email,
                            password: values.password,
                            id: values.id
                        };

                        setSubmitting(false);
                    }, 500);
                }}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                    } = props;
                    return (
                        <div>
                            <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

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
                                    />
                                    {errors.confirmPassword && touched.confirmPassword && (
                                        <div className="input-feedback">{errors.confirmPassword}</div>
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
                                    />
                                    {errors.email && touched.email && (
                                        <div className="input-feedback">{errors.email}</div>
                                    )}
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout}>
                                    <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                                        Submit
                </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    );
                }}
            </Formik>

        </div>
    )
}

export default RegisterForm
