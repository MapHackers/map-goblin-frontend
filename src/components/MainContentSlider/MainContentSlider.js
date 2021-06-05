import React from 'react'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

function MainContentSlider() {
    return (
        <div style={{ width: '100%', height: '60vmin', display: 'block', position: 'relative', marginLeft: 'auto', marginRight: 'auto' }}>
            <AwesomeSlider fillParent={true}>
                <div style={{ backgroundColor: "#A0D0FD" }}>
                    <img src="/mainbg2.png" alt="" style={{ width: '100%', height: '100%'}}/>
                </div>
                <div style={{ backgroundColor: "#A0D0FD" }}>
                    <h1 style={{ color: "white", fontSize: '60px' }}>아직 내 지도가 없군요! 지금 만들어 보아요!</h1>
                </div>
                <div style={{ backgroundColor: "#A0D0FD" }}>
                    <h1 style={{ color: "white", fontSize: '70px' }}>카테고리별로 지도를 검색해 봐요!</h1>
                </div>
            </AwesomeSlider>
        </div>
    )
}

export default MainContentSlider
