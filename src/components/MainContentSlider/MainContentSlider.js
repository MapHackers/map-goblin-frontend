import React from 'react'
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

function MainContentSlider() {
    return (
        <div style={{ width: '100%', height: '60vmin', display: 'block', position: 'relative', marginLeft: 'auto', marginRight: 'auto' }}>
            <AutoplaySlider
                fillParent={true}
                play={true}
                interval={5000}
                cancelOnInteraction={true}

            >
                <div style={{ backgroundColor: "#A0D0FD" }}>
                    <img src="/mainslider1.png" alt="" style={{ width: '100vw', height: '600px' }} />
                </div>
                <div style={{ backgroundColor: "#A0D0FD" }}>
                    <img src="/mainslider2.png" alt="" style={{ width: '100vw', height: '600px' }} />
                </div>
                <div style={{ backgroundColor: "#A0D0FD" }}>
                    <h1 style={{ color: "white", fontSize: '70px' }}>카테고리별로 지도를 검색해 봐요!</h1>
                </div>
            </AutoplaySlider>
        </div>
    )
}

export default MainContentSlider
