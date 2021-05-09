import React from 'react'
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { Menu, Dropdown } from 'antd'
import { useSelector, connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

function UserIcon(props) {
    //const user = useSelector(state => state.user)
    //console.log(userId)
    const onClickLogoutHandler = () => {
        window.localStorage.setItem("userToken", '')
        props.history.push('/')
    }

    const onClickMyPageHandler = () => {
        props.history.push(`/${props.userId}`)
    }

    // let userName = useSelector(state => state.user.userData)
    // let IuserName = ''
    // if (userName !== undefined){
    //     IuserName = userName.data.name
    // }

    const UserMenu = (
        <Menu>
            <Menu.Item key="0">
                <div>
                    User Icon
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1" onClick={onClickMyPageHandler}>
                My Page
            </Menu.Item>
            <Menu.Item key="3" onClick={onClickLogoutHandler}>LogOut</Menu.Item>
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
                    <h3 style={{ marginTop: '1.2rem', marginLeft: '5px' }} className="ant-dropdown-link"> {props.userName} <DownOutlined /> </h3>
                </Dropdown>

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    userId: state.user.userId,
    userName: state.user.userName
})

export default withRouter(connect(mapStateToProps)(UserIcon))

const UserIconContainer = styled.div`
    border-radius: 1.3rem;
    background-color: white;
    width: 2.6rem;
    height: 2.6rem;
    margin-top: 0.8rem;
    text-align: center;
    vertical-align: middle
`