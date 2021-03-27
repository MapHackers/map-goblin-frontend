import React from 'react'
import { Button } from 'antd'

function ButtonBox() {
    return (
        <div style={{ display: 'flex'}}>
            <div style={{ display: 'flex', width: '30%', margin: '0 auto' }}>
                <div style={{ margin: '0 auto' }}>
                    <Button href="/login" size="large" type="primary"> 로그인 </Button>
                </div>
                <div style={{ margin: '0 auto' }}>
                    <Button href="/register" size="large" type="primary"> 회원가입 </Button>
                </div>
            </div>
        </div>
    )
}

export default ButtonBox
