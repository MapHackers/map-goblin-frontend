import React from 'react'
import UserProfile from './UserProfile'
import RepositoryTaps from './RepositoryTaps'

function MyPageFrame(props) {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '70vw', display: 'flex', margin: '0 auto', paddingTop: '30px'}}>
                <UserProfile userId={props.userId} />
                <RepositoryTaps />
            </div>
        </div>
    )
}

export default MyPageFrame
