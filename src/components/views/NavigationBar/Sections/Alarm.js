import React from 'react'
import { BellOutlined } from '@ant-design/icons';

function Alarm() {
    return (
        <div style={{
            borderRadius: '20px',
            backgroundColor: '#E0E9FF',
            width: '40px',
            height: '40px',
            marginTop: '20px',
            textAlign: 'center',
            verticalAlign: 'middle',
            marginRight: '30px'
        }}>
            <BellOutlined style={{ fontSize: '30px', marginTop: '3px' }} />
        </div>
    )
}

export default Alarm
