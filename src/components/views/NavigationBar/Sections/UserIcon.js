import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components'

function UserIcon() {
    return (
        <div style={{ display: 'flex' }}>
            <UserIconContainer>
                <UserOutlined style={{ fontSize: '2rem' }} />
            </UserIconContainer>
            <div style={{
                float: 'right'
            }}>
                <h3 style={{ marginTop: '25px', marginLeft: '5px' }}> UserName </h3>
            </div>
        </div>
    )
}

export default UserIcon

const UserIconContainer = styled.div`
    border-radius: 1.3rem;
    background-color: white;
    width: 2.6rem;
    height: 2.6rem;
    margin-top: 0.8rem;
    text-align: center;
    vertical-align: middle
`