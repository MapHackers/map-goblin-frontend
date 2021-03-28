import React from 'react'
import { Avatar } from 'antd';
import { AntDesignOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';


function UserProfile(props) {
    // width: 25vw
    return (
        <div style={{ width: '240px', height: '560px', border: '1px solid black', margin: '0 auto' }}>
            <div style={{ backgroundColor: 'paleturquoise', width: '238px', height: '150px' }} />
            <div style={{ position: 'relative' }}>
                <Avatar
                    style={{ top: '-70px', left: '48.5px', position: 'absolute' }}
                    size={140}
                    icon={<AntDesignOutlined />}
                />
                <Avatar
                    style={{ top: '25px', left: '160px', position: 'absolute', backgroundColor: '#A0D4F1' }}
                    size={30}
                    icon={<PlusOutlined />}
                />
            </div>
            <div style={{ height: '100px'}}>

            </div>
            <div>
                <h2> {props.userId} </h2>
                <h3> dydfuf@naver.com </h3>
                <div style={{ paddingTop: '50px'}}>
                    User Description
                    <br />
                    <br />
                    Welcome to dydfuf's Map!
                </div>
            </div>
        </div>
    )
}

export default UserProfile
