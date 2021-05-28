import React from 'react'
import styled from 'styled-components'
import LogoImage from '../../assets/images/Logo.png'

const MapController = ({ MarkerOnClick, isMarkerCreatable, authority, GpsOnClick }) => {
    return (
        <>
            {authority === "OWNER" &&
                <Controller onClick={MarkerOnClick}>
                    <img style={{ width: '100%', height: '100%', backgroundColor: isMarkerCreatable ? 'rgba(0,100,255, 0.2)' : 'whitesmoke', boxShadow: '2px 2px 2px 2px gray' }} src={LogoImage} alt="Logo" />
                </Controller>
            }
            <Controller style={{top: '250px'}} onClick={GpsOnClick}>
                <img style={{ width: '100%', height: '100%', backgroundColor: 'whitesmoke', boxShadow: '2px 2px 2px 2px gray'}} src="../../gps-fixed.svg" alt="gps"/>
            </Controller>
        </>

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
`