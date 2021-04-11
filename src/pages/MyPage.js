import React from 'react'
import NavBar from '../components/NavigationBar/NavigationBar'
import UserProfile from '../components/UserProfile/UserProfile'
import RepositoryTaps from '../components/RepositoryTaps/RepositoryTaps'

function MyPage(props) {

    const userId = props.match.params.userId

    return (
        <div>
            <NavBar />
            <div style={{ display: 'flex' }}>
                <div style={{ width: '70vw', display: 'flex', margin: '0 auto', paddingTop: '30px' }}>
                    <UserProfile userId={userId} />
                    <RepositoryTaps />
                </div>
            </div>
        </div>
    )
}

export default MyPage
