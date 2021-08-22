import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function Logo() {
    return (
        <LogoContainer>
            <Link to="/main">
                <LogoItem src='/Logo.png' alt="MapGoblinLogo"/>
            </Link>
        </LogoContainer>
    )
}

export default Logo

const LogoContainer = styled.div`
    flex: none;
    height: 4rem;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-content: center;
`

const LogoItem = styled.img`
    margin-top: 0.4rem;
    height: 3.2rem;
`