import React from 'react'
import styled from 'styled-components'
import LogoImage from '../../assets/images/Logo.png'
import { Checkbox } from 'antd'

const plainOptions = ['Layer1','Layer2','Layer3'];

const MapController = ({ MarkerOnClick, isMarkerCreatable, authority, GpsOnClick, onLayerCheckBoxClick }) => {
    return (
        <>
            {authority === "OWNER" &&
                <Controller onClick={MarkerOnClick}>
                    <img style={{ width: '100%', height: '100%', backgroundColor: isMarkerCreatable ? 'rgba(0,100,255, 0.2)' : 'whitesmoke', boxShadow: '2px 2px 2px 2px gray' }} src={LogoImage} alt="Logo" />
                </Controller>
            }
            <Controller style={{ top: '250px' }} onClick={GpsOnClick}>
                <img style={{ width: '100%', height: '100%', backgroundColor: 'whitesmoke', boxShadow: '2px 2px 2px 2px gray' }} src="../../gps-fixed.svg" alt="gps" />
            </Controller>
            <Controller style={{ top: '10px', width:'300px', right: '30px', backgroundColor: 'whitesmoke', textAlign: 'center', margin: '0 auto', alignItems: 'center', boxShadow: '2px 2px 2px 2px gray' }}>
                <Checkbox.Group options={plainOptions} defaultValue={['Layer1']} onChange={onLayerCheckBoxClick} style={{ fontSize: '1.2rem'}} />
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

