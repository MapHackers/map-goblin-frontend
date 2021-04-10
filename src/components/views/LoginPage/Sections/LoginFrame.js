import React from 'react'
import Logo from './Logo'
import Title from './Title'
import LoginForm from './LoginForm'
import styled from 'styled-components'

function LoginFrame() {
    return (
        <LoginFrameContainer>
            <HeaderContainer>
                <Logo />
                <Title />
            </HeaderContainer>
            <FormContainer>
                <LoginForm />
            </FormContainer>
        </LoginFrameContainer>
    )
}
export default LoginFrame

const LoginFrameContainer = styled.div`
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
`

const FormContainer = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 30vw;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`