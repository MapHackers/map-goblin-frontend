import React from 'react'
import Logo from './Logo'
import Title from './Title'
import FindPasswordForm from './FindPasswordForm'
import styled from 'styled-components'

function FindPasswordFrame() {
    return (
        <FindPasswordFrameContainer>
            <HeaderContainer>
                <Logo />
                <Title />
            </HeaderContainer>
            <FormContainer>
                <FindPasswordForm />
            </FormContainer>
        </FindPasswordFrameContainer>
    )
}

export default FindPasswordFrame

const FindPasswordFrameContainer = styled.div`
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