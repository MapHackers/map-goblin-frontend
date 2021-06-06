import React from 'react'
import MainImage from '../components/LandingFrame/MainImage'
import Footer from '../components/Footer/Footer'

function LandingPage() {
    return (
        <div style={{ background: '#f5f6f7', height: '100vh', backgroundImage: 'url(/landing2.png)', backgroundSize: '100%' }}>
            <div>
                <MainImage />
                <Footer />
            </div>
        </div>

    )
}

export default LandingPage
