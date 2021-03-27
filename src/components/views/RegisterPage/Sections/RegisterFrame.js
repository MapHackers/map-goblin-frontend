import React from 'react'
import Logo from './Logo'
import Title from './Title'
import RegisterForm from './RegisterForm'

function RegisterFrame() {
    return (
        <div style={{ width: '400px', height: '379px', left: '149px', top: '0px', background: '#FFFFF0', display: 'flex', flexDirection: 'column', margin: '0 auto'}}>
            <Logo />
            <Title />
            <RegisterForm />
        </div>
    )
}

export default RegisterFrame
