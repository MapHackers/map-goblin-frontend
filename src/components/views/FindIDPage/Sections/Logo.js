import React from 'react'
import LogoImage from '../../../../assets/images/Logo.png'

function Logo() {
    return (
        <div style={{ margin: '0 auto' }}>
            <img style={{ width: '4rem', height: '4rem' }} src={LogoImage} alt="Logo" />
        </div>
    )
}

export default Logo
