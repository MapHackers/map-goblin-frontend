import React from 'react'
import FormFrame from '../components/Form/FormFrame'

function LoginPage() {
    return (
        <div style={{ display: 'flex', background: '#f5f6f7', position: 'relative', height: '100%'}}>
            <FormFrame FormType="Login"/>
        </div>
    )
}

export default LoginPage
