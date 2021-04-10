import React from 'react'
import Logo from './Sections/Logo'
import ButtonBox from './Sections/ButtonBox'
import SearchBar from './Sections/SearchByRepoName'
import Alarm from './Sections/Alarm'
import UserIcon from './Sections/UserIcon'
import styled from 'styled-components'

function NavigationBar() {
    return (
        <NavContainer>
            <Logo />
            <ButtonBox />
            <SearchBar />
            <UserIconContainer>
                <Alarm />
                <UserIcon />
            </UserIconContainer>
        </NavContainer>
    )
}
export default NavigationBar

const NavContainer = styled.div`
    padding: 0 20px;
    border-bottom: solid 1px #e8e8e8;
    overflow: auto;
    box-shadow: 0 0 30px #f3f1f1;
    display: flex;
    justify-content: space-between;
    align-content: center;
    background-color: rgba(160, 208,253, 0.3);
    height: 4rem;
`

const UserIconContainer = styled.div`
    display: flex;
`