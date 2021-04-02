import React from 'react'
import { UserOutlined } from '@ant-design/icons';

function UserIcon() {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{
                borderRadius: '25px',
                backgroundColor: '#E0E9FF',
                width: '50px',
                height: '50px',
                marginTop: '15px',
                textAlign: 'center',
                verticalAlign: 'middle'
            }}>
                <UserOutlined style={{ fontSize: '40px'}} />
            </div>
            <div style={{
                float: 'right'
            }}>
                <h3 style={{ marginTop: '25px', marginLeft: '5px' }}> UserName </h3>
            </div>
        </div>
    )
}

export default UserIcon
