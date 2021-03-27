import React from 'react'
import Logo from './Logo'
import Title from './Title'
import LoginForm from './LoginForm'

function LoginFrame() {
    return (
        <div style={{width:'302px', height:'379px', left:'149px', top:'0px', background:'#FFFFF0', margin: '0 auto'}}>
            <Logo/>
            <Title/>
            <LoginForm/>
        </div>
    )
}
export default LoginFrame
