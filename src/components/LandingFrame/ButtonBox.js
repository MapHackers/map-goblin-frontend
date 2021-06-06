import React from 'react'
import { Button } from 'antd'

function ButtonBox() {
    return (
        <div style={{ display: 'flex', marginLeft: '1000px', paddingTop: '60px', flexDirection: 'column' }}>
            <div style={{ display: 'flex', width: '30%', margin: '0 auto' }}>
                <div style={{ margin: '0 auto' }}>
                    <Button href="/login"
                        size="large" type="primary"
                        style={{ width: '150px', height: '45px', borderRadius: '0.5rem' }}
                    >
                        <h1 style={{ fontSize: '1.5rem', marginTop: '3px', color: 'wheat' }}> 로그인 </h1>
                    </Button>
                </div>
                <div style={{ margin: '0 auto', marginLeft: '70px'}}>
                    <Button href="/register"
                        size="large" type="primary"
                        style={{ width: '150px', height: '45px', borderRadius: '0.5rem' }}
                    >
                        <h1 style={{ fontSize: '1.5rem', marginTop: '3px', color: 'wheat' }}> 회원가입 </h1>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ButtonBox
