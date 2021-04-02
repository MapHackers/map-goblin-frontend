import React from 'react'
import Logo from './Logo'
import Title from './Title'
import FindIdForm from './FindIDForm'

function FindIDPageFrame() {
    return (
        <div style={{ width: '300px', height: '200px', left: '149px', top: '0px', background: '#FFFFF0', margin: '0 auto' }}>
            <Logo />
            <Title />
            <FindIdForm />
        </div>
    )
}

export default FindIDPageFrame
