import React, {useEffect, lazy, useState} from 'react'
import Logo from './Sections/Logo'
import ButtonBox from './Sections/ButtonBox'
import SearchBar from './Sections/SearchByRepoName'
import UserIcon from './Sections/UserIcon'
import styled from 'styled-components'
import {useSelector, connect, useDispatch} from "react-redux";
import {loadAlarm} from "../../_actions/alram_action";
import Alarm from "./Sections/Alarm";

function NavigationBar(props) {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);

    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(loadAlarm(user.userId))
            .then(response => {
                setIsLoading(false);
            })
    }, [])

    return (
        <>
            {isLoading ? null : <NavContainer>
                <Logo />
                <ButtonBox />
                <SearchBar />
                <UserIconContainer>
                    <Alarm user={user}/>
                    <UserIcon />
                </UserIconContainer>
            </NavContainer>}
        </>
    )
}

export default NavigationBar

const NavContainer = styled.div`
    padding: 0 20px;
    border-bottom: solid 1px #e8e8e8;
    box-shadow: 0 0 30px #f3f1f1;
    display: flex;
    justify-content: space-between;
    align-content: center;
    height: 4rem;
    background: rgba( 160, 208, 253, 0.3 );
`

const UserIconContainer = styled.div`
    display: flex;
`