import React from 'react'
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { Menu, Dropdown } from 'antd'


function UserIcon() {

    const UserMenu = (
        <Menu>
            <Menu.Item key="0">
                <div>
                    User Icon
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1">
                <a href="/">My Page</a>
            </Menu.Item>
            <Menu.Item key="3">LogOut</Menu.Item>
        </Menu>
    )

    return (
        <div style={{ display: 'flex' }}>
            <UserIconContainer>
                <UserOutlined style={{ fontSize: '2rem' }} />
            </UserIconContainer>
            <div style={{
                float: 'right'
            }}>
                <Dropdown overlay={UserMenu} trigger={['click']}>
                    <h3 style={{ marginTop: '1.2rem', marginLeft: '5px' }} className="ant-dropdown-link"> UserName <DownOutlined /> </h3>
                </Dropdown>

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