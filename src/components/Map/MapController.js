import React from 'react'
import styled from 'styled-components'
import LogoImage from '../../assets/images/Logo.png'

const MapController = ({ MarkerOnClick }) => {
    return (
        <Controller onClick={MarkerOnClick}>
            <img style={{ width: '100%', height: '100%' }} src={LogoImage} alt="Logo" />
        </Controller>
    )
}

export default MapController

const Controller = styled.a`
    position: absolute;
    z-index: 420;
    width: 33px;
    height: 33px;
    top: 200px;
    right: 3.5px;
    display: block;
    background-color: whitesmoke;
`