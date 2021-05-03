import React, { useState } from 'react'
import { Formik } from 'formik'
import { Form, Input, Button } from 'antd'
import * as Yup from 'yup'
import axios from 'axios'
import { withRouter } from 'react-router-dom';


function FindPasswordForm(props) {
    const [typePassword, settypePassword] = useState(false)
    const [typeEmailCode, settypeEmailCode] = useState(false)
    const [userId, setuserId] = useState('')
    const [userToken, setuserToken] = useState('')
    const [userEmail, setuserEmail] = useState('')

    return (
        <div>
            {!typePassword ?
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

                            let dataToSubmitEmail = {
                                email: values.email
                            }

                            axios.post(`/api/find`, dataToSubmit)
                                .then(response => {
                                    setuserId(response.data.id)
                                    setuserToken(response.data.token)
                                    setuserEmail(response.data.email)
                                    axios.post(`/api/email`, dataToSubmitEmail)
                                        .then(response => {
                                            alert("가입한 이메일을 확인하여 코드를 입력해 주세요.")
                                            settypePassword(true)
                                            settypeEmailCode(true)
                                        })
                                        .catch(err => {
                                            alert("이메일 오류!")
                                        })
                                })
                                .catch(err => {
                                    alert("해당 이메일로 만든 아이디가 없습니다!")
                                })
                            values.id = ''
                            values.email = ''
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

                : (!typeEmailCode ?
                    <Formik
                        initialValues={{
                            password: ''
                        }}
                        validationSchema={Yup.object().shape({
                            password: Yup.string()
                                .required('비밀번호를 입력 해주세요.'),
                            confirmPassword: Yup.string()
                                .oneOf([Yup.ref('password'), null], '비밀번호가 다릅니다.')
                                .required('비밀번호 확인은 필수 항목입니다.')
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {

                                let dataToSubmit = {
                                    password: values.password,
                                    confirmPassword: values.confirmPassword
                                }

                                axios.post(`/api/members/${userId}/password`, dataToSubmit, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-AUTH-TOKEN': `${userToken}`,
                                    }
                                })
                                    .then(response => {
                                        if (response.status === 200) {
                                            alert("비밀번호 변경이 완료되었습니다. 로그인 해주세요")
                                        }
                                        props.history.push('/login')
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
                                    <Form.Item required>
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
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" size="large" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                                            비밀번호변경하기
                                    </Button>
                                    </Form.Item>
                                </form>
                            )
                        }
                        }
                    </Formik>

                    :

                    <Formik
                        initialValues={{
                            code: ''
                        }}
                        validationSchema={Yup.object().shape({
                            code: Yup.string()
                                .required('이메일을 확인하여 코드를 입력해 주세요'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {

                                let dataToSubmit = {
                                    email : userEmail,
                                    code : values.code
                                }

                                axios.post(`/api/checkNumber`, dataToSubmit)
                                    .then(response => {
                                        console.log(response.status)
                                        if (response.status === 200) {
                                            alert("변경할 비밀번호를 입력해 주세요")
                                            settypeEmailCode(false)
                                        }
                                    })
                                    .catch(err => {
                                        alert("잘못된 인증번호입니다.")
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
                                            id='code'
                                            placeholder="인증번호"
                                            type='code'
                                            value={values.code}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={
                                                errors.code && touched.code ? 'text-input error' : 'text-input'
                                            }
                                            size="large"
                                        />
                                        {errors.code && touched.code && (
                                            <div className="input-feedback">{errors.code}</div>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" size="large" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                                            확인
                                    </Button>
                                    </Form.Item>
                                </form>
                            )
                        }
                        }
                    </Formik>

                )

            }
        </div>
    )
}

export default withRouter(FindPasswordForm)
