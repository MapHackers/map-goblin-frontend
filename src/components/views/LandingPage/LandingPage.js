import React from 'react'
import LandingPageFrame from './Sections/LandingPageFrame'
import { useSelector } from 'react-redux'

function LandingPage() {
    const user = useSelector(state => state.user)
    console.log(user.loginUser)
    return (
        <div>
            <LandingPageFrame />
        </div>
    )
}

export default LandingPage
