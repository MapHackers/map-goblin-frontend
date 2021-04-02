import React from 'react'
import Logo from './Sections/Logo'
import ButtonBox from './Sections/ButtonBox'
import SearchBar from './Sections/SearchByRepoName'
import Alarm from './Sections/Alarm'
import UserIcon from './Sections/UserIcon'

function NavigationBar() {
    return (
        <div style={{
            padding: '0 20px',
            borderBottom: 'solid 1px #e8e8e8',
            overflow: 'auto',
            boxShadow: '0 0 30px #f3f1f1',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFEE',
        }}>
            <Logo />
            <ButtonBox />
            <SearchBar />
            <div style={{
                display: 'flex'
            }}>
                <Alarm />
                <UserIcon />
            </div>

        </div>
    )
}
export default NavigationBar
