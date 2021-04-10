import React from 'react'
import { BellOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { Badge, Menu, Dropdown } from 'antd'

function Alarm() {

    const AlarmList = (
        <Menu>
            <Menu.Item key="0">
                <a href="https://www.antgroup.com">1st menu item</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a href="https://www.aliyun.com">2nd menu item</a>
            </Menu.Item>
            <Menu.Item key="3">3rd menu item</Menu.Item>
        </Menu>
    )

    return (

        <AlarmContainer>
            <Badge count={5} size="small">
                <Dropdown overlay={AlarmList} trigger={['click']}>
                    <BellOutlined style={{ fontSize: '1.5rem', marginTop: '3px' }} />
                </Dropdown>
            </Badge>
        </AlarmContainer >

    )
}

export default Alarm

const AlarmContainer = styled.div`
    border-radius: 1.1rem;
    background-color: white;
    width: 2.2rem;
    height: 2.2rem;
    margin-top: 1rem;
    text-align: center;
    vertical-align: middle;
    margin-right: 1.5rem;
`