import React from 'react'
import Logo from './Logo'
import Title from './Title'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import FindIdForm from './FindIdForm'
import FindPasswordForm from './FindPasswordForm'
import styled from 'styled-components'

function FormFrame({ FormType }) {
    switch (FormType) {
        case "Register":
            console.log("Case", FormType)
            return (
                <FrameContainer>
                    <HeaderContainer>
                        <Logo />
                        <Title title="회원가입" />
                    </HeaderContainer>
                    <FormContainer>
                        <RegisterForm />
                    </FormContainer>
                </FrameContainer>
            )
        case "Login":
            return (
                <FrameContainer>
                    <HeaderContainer>
                        <Logo />
                        <Title title="로그인" />
                    </HeaderContainer>
                    <FormContainer>
                        <LoginForm />
                    </FormContainer>
                </FrameContainer>
            )
        case "FindId":
            return (
                <FrameContainer>
                    <HeaderContainer>
                        <Logo />
                        <Title title="아이디 찾기" />
                    </HeaderContainer>
                    <FormContainer>
                        <FindIdForm />
                    </FormContainer>
                </FrameContainer>
            )
        case "FindPassword":
            return (
                <FrameContainer>
                    <HeaderContainer>
                        <Logo />
                        <Title title="비밀번호 찾기" />
                    </HeaderContainer>
                    <FormContainer>
                        <FindPasswordForm />
                    </FormContainer>
                </FrameContainer>
            )
        default:
            return (
                <>
                    <div> Error </div>
                </>
            )
    }
}

export default FormFrame

const FrameContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: #f5f6f7;
    position: relative;
    display: flex;
    flex-direction: column;
`


const HeaderContainer = styled.div`
    position: relative;
    width: 50vw;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 5rem 0 3rem;
    @media (max-width: 850px) {
        width: 100vw;
        margin: 0;
    }
`

const FormContainer = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 30vw;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    @media (max-width: 850px) {
        width: 60vw;
        margin: 0 auto;
    }
`