import React from 'react'
import Logo from '../Atoms/Logo'
import styled from 'styled-components'

function Header() {
    return (
        <NavBarFrame>
            <Logo />
            <h1> 지도깨비 </h1>
        </NavBarFrame>
    )
}

export default Header


const NavBarFrame = styled.div`
    display: flex;
    margin-left: 1.5rem;
    margin-Top: 1.5rem;
`