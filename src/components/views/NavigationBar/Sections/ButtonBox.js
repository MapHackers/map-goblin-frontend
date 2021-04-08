import React from 'react'
import { Button } from 'antd'
import { withRouter } from 'react-router-dom';

function ButtonBox(props) {
    return (
        <Button
            type="primary"
            style={{
                float: 'left',
                marginTop: '20px',
                flex: 'none'
            }}
            size="large"
            onClick={() => {
                props.history.push(`/new`)
            }}
        >
            Create-My-Map
        </Button>
    )
}

export default withRouter(ButtonBox)
