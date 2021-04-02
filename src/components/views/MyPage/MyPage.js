import React from 'react'
import NavBar from '../NavigationBar/NavigationBar'
import MyPageFrame from './Sections/MyPageFrame'

function MyPage(props) {

    const userId = props.match.params.userId

    return (
        <div>
            <NavBar />
            <MyPageFrame userId={userId} />
        </div>
    )
}

export default MyPage
