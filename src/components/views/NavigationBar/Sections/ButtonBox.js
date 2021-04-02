import React from 'react'
import { Button } from 'antd'
function ButtonBox() {
    return (
        <Button
            type="primary"
            style={{
                float: 'left',
                marginTop: '20px',
                flex: 'none'
            }}
            size="large"
        >
            Create-My-Map
        </Button>
    )
}

export default ButtonBox
