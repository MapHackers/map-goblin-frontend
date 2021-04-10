import React from 'react'
import { BellOutlined } from '@ant-design/icons';
import styled from 'styled-components'

function Alarm() {
    return (
        <AlarmContainer>
            <BellOutlined style={{ fontSize: '1.5rem', marginTop: '3px' }} />
        </AlarmContainer>
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